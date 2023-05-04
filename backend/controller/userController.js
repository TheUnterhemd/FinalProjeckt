//imports
import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//environmentals
const saltRounds = 10;
const jwtSecret = "y<vdgkshjöshkhjsdghöouidgyfohöysdgöoysdgöhooi";

//user functions
//register
export const addUser = async (req, res) => {

}

