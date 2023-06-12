//IMPORTS OF MODULES
import Trainer from "../models/trainerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Token from "../models/refreshModel.js";
import VerifyToken from "../models/verifyToken.js";
import crypto from "crypto";
import { verifyMailer } from "../validation/verifyMail.js";

//Config Enviromentals
dotenv.config();

//ENVIROMENTALS
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const secret = process.env.JWT_SECRET;
const salt = Number(process.env.SALT_ROUNDS);
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

//config Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

//FUNCTIONS
//Funktion zum Hinzufügen eines Trainers mit email zur validierung des accounts.
export const addTrainer = async (req, res) => {
  const {
    courses,
    email,
    firstName,
    lastName,
    password,
    address,
    imgURL,
    profession,
  } = req.body;

  let exist;
  // Überprüfen, ob der Trainer bereits existiert
  try {
    exist = await Trainer.findOne({ email });
  } catch (error) {
    console.log(error.message);
  }
  // Wenn der Trainer bereits existiert, Fehlermeldung zurückgeben
  if (exist) {
    return res
      .status(404)
      .json({ message: "Trainer already exists! Login instead" });
  }
  // Das Passwort des Trainers hashen
  const hashedPW = bcrypt.hashSync(password, salt);

  // Ein neues Trainer-Objekt erstellen
  const trainer = new Trainer({
    lastName,
    firstName,
    address,
    email,
    password: hashedPW,
    courses,
    imgURL,
    profession,
  });

  // Trainer in der Datenbank speichern
  try {
    await trainer.save();

    // Wenn ein Profilbild hochgeladen wurde, dieses zu Cloudinary hochladen
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `profile_picture_${trainer._id}`,
        folder: `localtrainer/avatar/trainer/${trainer._id}`,
      });

      // Die URL des hochgeladenen Bildes speichern
      trainer.imgURL = result.secure_url;
    }

    await trainer.save();
  } catch (error) {
    console.log(error.message);
  }
  // E-Mail-Validierung
  // Einen Verifizierungstoken für den Trainer erstellen
  try {
    const trainerToken = new VerifyToken({
      userID: trainer._id,
      verifyToken: crypto.randomBytes(16).toString("hex"),
    });
    console.log(trainerToken);
    await trainerToken.save();

    // E-Mail mit dem Verifizierungslink an den Trainer senden
    const link = `http://localhost:5002/token/verify/${trainerToken.verifyToken}`;
    await verifyMailer(trainer.email, link);
  } catch (error) {
    console.log(error.message);
  }
  return res.status(200).json({
    message: "Trainer saved successfully, check your email",
  });
};
// Funktion um den Trainer anzumelde mit JWT access und refresh token
export const loginTrainer = async (req, res, next) => {
  const { email, password } = req.body;

  // Trainer anhand der E-Mail-Adresse in der Datenbank suchen und die Kurse sowie die aktuellen Schüler abrufen
  try {
    const trainer = await Trainer.findOne({ email }).populate({
      path: "courses",
      populate: {
        path: "currentStudents",
        select: "firstName lastName imgURL",
      },
    });

    // Wenn kein Trainer mit der angegebenen E-Mail-Adresse gefunden wurde, Fehlermeldung zurückgeben
    if (!trainer) {
      return res
        .status(404)
        .json({ message: "Trainer not found! Register instead" });
    }

    // Wenn der Trainer nicht verifiziert ist, Fehlermeldung zurückgeben
    if (!trainer.verified) {
      return res.status(401).json({ message: "Trainer not verified" });
    }

    // Überprüfen, ob das eingegebene Passwort korrekt ist
    const isPasswordCorrect = bcrypt.compareSync(password, trainer.password);

    // Wenn das Passwort nicht korrekt ist, Fehlermeldung zurückgeben
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Payload für den Zugriffstoken erstellen
    const tokenPayload = {
      user: {
        trainer: true,
        _id: trainer._id,
        courses: trainer.courses,
        profession: trainer.profession,
        address: trainer.address,
        imgURL: trainer.imgURL,
      },
    };

    // Payload für den Refresh Token erstellen
    const refreshTokenPayload = {
      id: trainer._id,
    };

    // Zugriffstoken generieren
    const accessToken = jwt.sign(tokenPayload, secret, { expiresIn: "1h" });

    // Überprüfen, ob bereits ein Refresh Token für den Trainer in der Datenbank existiert
    let refreshToken = await Token.findOneAndUpdate(
      { trainer: trainer._id },
      {
        refreshToken: jwt.sign(refreshTokenPayload, refreshSecret, {
          expiresIn: "1d",
        }),
      },
      { upsert: true, new: true }
    ).select("refreshToken");

    // Cookie mit dem Refresh Token im Response setzen
    res.cookie("LocalTrainer", refreshToken.refreshToken, {
      maxAge: 86400000, // Gültigkeitsdauer des Cookies: 24 Stunden
      httpOnly: true,
      withCredentials: true,
      //sameSite: "None", // Kommentiert, da es potenziell zu Problemen führen kann
      //secure: false, // Kommentiert, da es potenziell zu Problemen führen kann
    });

    // Erfolgreiche Anmeldung und Trainerinformationen zurückgeben
    return res.status(200).json({
      user: {
        accessToken,
        _id: trainer._id,
        lastName: trainer.lastName,
        firstName: trainer.firstName,
        imgURL: trainer.imgURL,
        profession: trainer.profession,
        courses: trainer.courses,
        address: trainer.address,
        trainer: true,
      },
      message: "Trainer logged in",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutTrainer = async (req, res) => {
  res.clearCookie("LocalTrainer").json({ message: "logged out" });
};

//Funktion um den Trainer zu updaten
export const updateTrainer = async (req, res) => {
  // Die ID des Trainers, der aktualisiert werden soll
  const id = req.params.id;
  const filter = { _id: id };

  // Die zu aktualisierenden Informationen
  const updates = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: {
      street: req.body.street,
      code: req.body.postalCode,
      city: req.body.city,
    },
    courses: req.body.courses,
    imgURL: req.body.imgURL,
    profession: req.body.profession,
  };

  // Trainer wird anhand von ID gesucht um address-werte beizubehalten falls keine neuen mitgesendet wurden
  const trainer = await Trainer.findById(id);

  if (!req.body.street) {
    updates.address.street = trainer.address.street;
  }

  if (!req.body.city) {
    updates.address.city = trainer.address.city;
  }

  if (!req.body.postalCode) {
    updates.address.code = trainer.address.code;
  }

  // trainer._id wird mit der ID des Trainers verglichen, der versucht die Änderungen zu pushen.
  // wenn das nicht die gleiche ist, wird Fehler geworfen

  if (!trainer._id.equals(req.trainer.user._id)) {
    return res
      .status(403)
      .json({ message: "You are not allowed to update this trainer." });
  }
  try {
    // Wenn eine Datei (Bild) in der Anfrage enthalten ist, wird sie zu Cloudinary hochgeladen
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `profile_picture_${id}`,
        folder: `localtrainer/avatar/trainer/${id}`,
      });
      // Die sichere URL des hochgeladenen Bildes wird gespeichert
      updates.imgURL = result.secure_url;
    }

    // Trainer in der Datenbank anhand der ID aktualisieren und die neuen Informationen setzen
    const result = await Trainer.findOneAndUpdate(filter, updates, {
      new: true,
    })
      .select("-passwort")
      .populate({
        path: "courses",
        populate: {
          path: "currentStudents",
          select: "firstName lastName imgURL",
        },
      });

    // Wenn kein Trainer gefunden wurde, gibt es einen Fehler bei der Aktualisierung
    if (!result) {
      return res.status(500).json({ message: "Not able to update trainer" });
    }

    // Erfolgreiche Aktualisierung des Trainers und den aktualisierten Trainer zurückgeben
    return res.status(200).json({ user: result, message: "trainer updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const passwordChange = async (req, res) => {
  const id = req.params.id;
  const { currentPassword, newPassword} = req.body;

  try {
    //Suche nach dem Trainer in der Datenbank
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    // Validierung des alten Passworts
    const isPasswordCorrect = await bcrypt.compare(oldPassword, trainer.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid old password" });
    }

    // Sicherstellung ob die beiden neuen Eingaben identisch sind
    //if (newPassword !== confirmPassword) {
    //  return res.status(400).json({ error: "Passwords do not match" });
    //}

    // Passwort hashen
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Speichern des neuen Passworts
    trainer.password = hashedPassword;
    await trainer.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllTrainers = async (req, res, next) => {
  let trainers;
  try {
    trainers = await Trainer.find()
      .select("-password")
      .populate({
        path: "courses",
        populate: {
          path: "currentStudents",
          select: "firstName lastName imgURL",
        },
      });
  } catch (error) {
    console.log(error.message);
  }
  if (!trainers) {
    return res.status(404).json({ message: "No trainers found" });
  }
  return res.status(200).json(trainers);
};

export const getTrainer = async (req, res, next) => {
  let trainer;
  const id = req.params.id;
  try {
    trainer = await Trainer.findOne({ _id: id })
      .select("-password")
      .populate({
        path: "courses",
        populate: {
          path: "currentStudents",
          select: "firstName lastName imgURL",
        },
      });
  } catch (error) {
    console.log(error.message);
  }
  if (!trainer) {
    return res.status(404).json({ message: "No trainer found" });
  }
  return res.status(200).json(trainer);
};
