//imports
/* import express from 'express'; */
import dotenv from 'dotenv';
/* import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; */
import User from '../models/User.js';

//environmentals
const saltRounds = 10;
const jwtSecret = "y<vdgkshjöshkhjsdghöouidgyfohöysdgöoysdgöhooi";

//config
dotenv.config();

//user functions
//register
export const addUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
    })

    try{
        await newUser.save();
        res.status(201).json(newUser);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Server error"});
    }
}

