//imports
/* import express from 'express'; */
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";

//config
dotenv.config();

//environmentals
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

    const {firstName, lastName, email, password, imgURL} = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hash,
        imgURL
    })

    try{
        await newUser.save();

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                public_id: `profile_picture_${newUser._id}`,
                folder: `localtrainer/avatar/user/${newUser._id}`
            })
            newUser.imgURL = result.secure_url;}

        await newUser.save();

        res.status(201).json({user: newUser._id, email: newUser.email, imgURL: newUser.imgURL});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"});
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({msg: "User does not exist. "});

    const passAuth = bcrypt.compareSync(password, user.password);
    if(passAuth){
        jwt.sign({
            id: user._id,
        }, jwtSecret, {expiresIn: "1h"}, (err, token) => {
            if (err) throw err;
            res.cookie("LocalTrainer",{user:newUser._id} + token);
        })
    }else {
        res.status(400).json("wrong credentials");
    }
}

export const logoutUser = async (req, res) => {
    res.clarCookie("LocalTrainer").json("logged out");
}



export const updateUser = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };

  const updates = req.body;
  console.log(updates);

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `profile_picture_${id}`,
        folder: `localtrainer/avatar/user/${id}`,
      });

      updates.imgURL = result.secure_url;
    }

    const result = await User.findOneAndUpdate(filter, updates, { new: true });

    res.send(result);
  } catch (error) {
    res.send(error);
  }
};


export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.send({user: user._id, email: user.email, imgURL: user.imgURL});
    } catch (error) {
        res.send(error);
    }
}

