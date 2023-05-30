//IMPORTS OF MODULES
import Trainer from "../models/trainerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Token from "../models/refreshModel.js"

//CONFIGS
dotenv.config();

//ENVIROMENTALS
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const secret = process.env.JWT_SECRET;
const salt = Number(process.env.SALT_ROUNDS);
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

//FUNCTIONS

export const addTrainer = async (req, res) => {
  const {
    courses,
    email,
    firstName,
    lastName,
    password,
    adress,
    imgURL,
    comments,
    likes,
    profession,
  } = req.body;
  let exist;
  try {
    exist = await Trainer.findOne({ email });
  } catch (error) {
    console.log(error.message);
  }
  if (exist) {
    return res
      .status(404)
      .json({ message: "Trainer already exists! Login instead" });
  }
  const hashedPW = bcrypt.hashSync(password, salt);
  const trainer = new Trainer({
    lastName,
    firstName,
    adress,
    email,
    password: hashedPW,
    courses,
    imgURL,
    profession,
  });
  try {
    await trainer.save();
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `profile_picture_${trainer._id}`,
        folder: `localtrainer/avatar/trainer/${trainer._id}`,
      });

      trainer.imgURL = result.secure_url;
    }

    await trainer.save();
  } catch (error) {
    console.log(error.message);
  }
  return res.status(200).json({
    message: "trainer saved successfully",
  });
};

export const loginTrainer = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const trainer = await Trainer.findOne({ email }).populate({
      path: "courses",
      populate: {
        path: "currentStudents",
        select: "firstName lastName imgURL",
      },
    });

    if (!trainer) {
      return res
        .status(404)
        .json({ message: "Trainer not found! Register instead" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, trainer.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const tokenPayload = {
      trainer: true,
      data: trainer._id,
      courses: trainer.courses,
      profession: trainer.profession,
      address: trainer.adress,
      imgURL: trainer.imgURL,
    };

    const accessToken = jwt.sign(tokenPayload, secret, { expiresIn: "1h" });

    // Überprüfe, ob bereits ein Refresh Token für den Trainer in der Datenbank existiert
    let refreshToken = await Token.findOneAndUpdate(
      { trainer: trainer._id },
      { refreshToken: jwt.sign(tokenPayload, refreshSecret, { expiresIn: "1d" }) },
      { upsert: true, new: true }
    ).select("refreshToken");
    console.log(refreshToken);

    res.cookie("LocalTrainer", refreshToken.refreshToken, {
      maxAge: 86400000,
      httpOnly: true,
      withCredentials: true,
      //sameSite: "None",
      //secure: false,
    });

    return res.status(200).json({
      user: {
        accessToken,
        refreshToken: refreshToken.refreshToken,
        _id: trainer._id,
        lastName: trainer.lastName,
        firstName: trainer.firstName,
        imgURL: trainer.imgURL,
        profession: trainer.profession,
        courses: trainer.courses,
        isTrainer: true,
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

export const updateTrainer = async (req, res, next) => {
  const id = req.params.id;
  const { courses, adress, profession } = req.body;
  let trainer;
  let imgURL;

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `profile_picture_${id}`,
        folder: `localtrainer/avatar/trainer/${id}`,
      });

      imgURL = result.secure_url;
    }
    trainer = await Trainer.findByIdAndUpdate(
      { _id: id },
      {
        courses,
        adress,
        profession,
        imgURL,
      }
    );

    if (!trainer) {
      return res.status(500).json({ message: "Not able to update trainer" });
    }
    return res
      .status(200)
      .json({ trainer: trainer, message: "trainer updated" });
  } catch (error) {
    console.log(error.message);
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
