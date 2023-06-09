//imports
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";
import Token from "../models/refreshModel.js";
import VerifyToken from "../models/verifyToken.js";
import crypto from "crypto";
import { verifyMailer } from "../validation/verifyMail.js";

//config
dotenv.config();

//environmentals
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);
const jwtSecret = process.env.JWT_SECRET;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

//user functions
//register
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, imgURL } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hash,
    imgURL,
  });

  try {
    await newUser.save();

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `profile_picture_${newUser._id}`,
        folder: `localtrainer/avatar/user/${newUser._id}`,
      });
      newUser.imgURL = result.secure_url;
    }

    await newUser.save();
  } catch (error) {
    console.log(error.message);
  }
  //Validation Email
  try {
    const userToken = new VerifyToken({
      userID: newUser._id,
      verifyToken: crypto.randomBytes(16).toString("hex"),
    });
    await userToken.save();

    const link = `http://localhost:5002/token/verify/${userToken.verifyToken}`;

    await verifyMailer(newUser.email, link);
  } catch (error) {
    console.log(error.message);
  }
  return res.status(200).json({
    message: "user saved successfully, check your email",
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .populate({
      path: "bookedCourses",
      populate: {
        path: "trainer",
        select: "firstName lastName imgURL",
      },
    })
    .populate("solvedCourses")
    .populate("comments");

  if (!user) return res.status(400).json({ msg: "User does not exist. " });

  if (!user.verified) {
    return res.status(401).json({ message: "User not verified" });
  }

  const passAuth = bcrypt.compareSync(password, user.password);
  if (passAuth) {
    const tokenPayload = {
      user: {
        trainer: false,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        email: user.email,
        imgURL: user.imgURL,
        interests: user.interests,
        bookedCourses: user.bookedCourses,
        solvedCourses: user.solvedCourses,
        comments: user.comments,
      },
    };
    const refreshTokenPayload = {
      trainer: false,
      data: {
        id: user._id,
      },
    };
    const accessToken = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "1h" });
    let refreshToken = await Token.findOneAndUpdate(
      { user: user._id },
      {
        refreshToken: jwt.sign(refreshTokenPayload, refreshSecret, {
          expiresIn: "1d",
        }),
      },
      { upsert: true, new: true }
    ).select("refreshToken");

    res.cookie("LocalTrainer", refreshToken.refreshToken, {
      maxAge: 86400000,
      httpOnly: true,
      //sameSite: "None",
      //secure: false,
    });

    return res.status(200).json({
      user: {
        accessToken,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        imgURL: user.imgURL,
        interests: user.interests,
        address: user.address,
        bookedCourses: user.bookedCourses,
        solvedCourses: user.solvedCourses,
        comments: user.comments,
        trainer: user.trainer,
      },
      message: "User logged in",
    });
  } else {
    res.status(400).json("wrong credentials");
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("LocalTrainer").json("logged out");
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };

  const updates = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: {
      street: req.body.street,
      code: req.body.postalCode,
      city: req.body.city,
    },
    imgURL: req.body.imgURL,
    interests: req.body.interests,
    bookedCourses: req.body.bookedCourses,
  };

  const user = await User.findById(id);
  // Überprüfen ob user wirklich user ist
  if (!user._id.equals(req.user.user._id)) {
    return res
      .status(403)
      .json({ message: "You are not allowed to update this user." });
  }

  if (!req.body.street) {
    updates.address.street = user.address.street;
  }

  if (!req.body.city) {
    updates.address.city = user.address.city;
  }

  if (!req.body.postalCode) {
    updates.address.code = user.address.code;
  }

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `profile_picture_${id}`,
        folder: `localtrainer/avatar/user/${id}`,
      });

      updates.imgURL = result.secure_url;
    }

    const result = await User.findOneAndUpdate(filter, updates, {
      new: true,
    })
      .select("-password")
      .populate({
        path: "bookedCourses",
        populate: {
          path: "trainer",
          select: "firstName lastName imgURL",
        },
      })
      .populate("solvedCourses")
      .populate("comments");
    console.log("result in updateUser:", result);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const removeBookedCourse = async (req, res) => {
  const userId = req.params.id;
  const courseId = req.params.courseId;

  try {
    const result = await User.findByIdAndUpdate(
      userId,
      { $pull: { bookedCourses: courseId } },
      { new: true }
    )
      .select("-password")
      .populate({
        path: "bookedCourses",
        populate: {
          path: "trainer",
          select: "firstName lastName imgURL",
        },
      })
      .populate("solvedCourses")
      .populate("comments");

    if (!result) {
      return res.status(404).json({ error: "Benutzer nicht gefunden." });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Fehler beim Entfernen des Kurses:", error);
    res.status(500).json({ error: "Ein Fehler ist aufgetreten." });
  }
};
export const passwordChange = async (req, res) => {
  const id = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    //Suche nach dem Trainer in der Datenbank
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validierung des alten Passworts
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid old password" });
    }

    // Sicherstellung ob die beiden neuen Eingaben identisch sind
    //if (newPassword !== confirmPassword) {
    //  return res.status(400).json({ error: "Passwords do not match" });
    //}

    // Passwort hashen
    const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);

    // Speichern des neuen Passworts
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const emailChange = async (req, res) => {
  const id = req.params.id;
  const {email,currentPassword} = req.body;

  try {
      const user = await User.findById(id);
      if(!user){
        return res.status(404).json({ error: "User not found" });
      }

      // Validierung des alten Passworts
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }

    user.email = email,
    user.verified = false;
    await user.save();
    // E-Mail-Validierung
  // Einen Verifizierungstoken für den Trainer erstellen
  try {
    const changeToken = new VerifyToken({
      userID: user._id,
      verifyToken: crypto.randomBytes(16).toString("hex"),
    });
    await changeToken.save();

    // E-Mail mit dem Verifizierungslink an den Trainer senden
    const link = `http://localhost:5002/token/verify/${changeToken.verifyToken}`;
    await verifyMailer(user.email, link);
  } catch (error) {
    console.log(error.message);
  }

    return res.status(200).json({ message: "check your emails" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
      .select("-password")
      .populate({
        path: "bookedCourses",
        populate: {
          path: "trainer",
          select: "firstName lastName imgURL",
        },
      })
      .populate("solvedCourses")
      .populate("comments");
    res.send({ user });
  } catch (error) {
    res.send(error);
  }
};

export const getUserByName = async (req, res) => {
  const userName = req.query.q;
  try {
    const result = await User.findByName(userName)
      .select("-password")
      .populate({
        path: "bookedCourses",
        populate: {
          path: "trainer",
          select: "firstName lastName imgURL",
        },
      })
      .populate("solvedCourses")
      .populate("comments");
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
