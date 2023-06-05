//imports
/* import express from 'express'; */
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";
import Token from "../models/refreshModel.js";
import VerifyToken from "../models/verifyToken.js";
import crypto from 'crypto';
import {verifyMailer} from "../validation/verifyMail.js"

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
  console.log(req.file);

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
      verifyToken: crypto.randomBytes(16).toString('hex'),
    });
    console.log(userToken);
    await userToken.save();

    const link = `http://localhost:5002/token/verify/${userToken.verifyToken}`

    await verifyMailer(newUser.email, link);
  } catch (error) {
    console.log(error.message);
  }
  return res.status(200).json({
   message: "user saved successfully, check your email",});
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .populate("bookedCourses")
    .populate("solvedCourses")
    .populate("comments");
  if (!user) return res.status(400).json({ msg: "User does not exist. " });

  const passAuth = bcrypt.compareSync(password, user.password);
  if (passAuth) {
    const tokenPayload = {
      user: {
        trainer: false,
        id: user._id,
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
        bookedCourses: user.bookedCourses,
        solvedCourses: user.solvedCourses,
        comments: user.comments,
        trainer: user.trainer
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

  const updates = req.body;

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
    }).select("-password").populate("bookedCourses")
    .populate("solvedCourses")
    .populate("comments");;

    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
      .select("-password")
      .populate("bookedCourses")
      .populate("solvedCourses")
      .populate("comments");
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

export const getUserByName = async (req, res) => {
  const userName = req.query.q;
  try {
    const result = await User.findByName(userName);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
