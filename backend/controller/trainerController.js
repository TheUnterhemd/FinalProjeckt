//IMPORTS OF MODULES
import Trainer from "../models/trainerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

//CONFIGS
dotenv.config();

//ENVIROMENTALS
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
    const {courses,email,firstName,lastName, password,adress,imgURL,comments,likes,profession} = req.body;
        let exist;
        console.log(req.body);
        try {
            exist = await Trainer.findOne({email})
            
        } catch (error) {
            console.log(error.message);
        }
        if(exist){
            return res.status(404).json({message: "Trainer already exists! Login instead"});
        }
        const hashedPW = bcrypt.hashSync(password,salt)
        const trainer = new Trainer({
            lastName ,
            firstName,
            adress,
            email,
            password:hashedPW,
            courses,
            imgURL,
            profession,
            comments,
            likes
        })
       try {
           await trainer.save() 
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path, {
                    public_id: `profile_picture_${trainer._id}`,
                    folder: `localtrainer/avatar/trainer/${trainer._id}`
                })
    
                trainer.imgURL = result.secure_url;
    
            }
    
            await trainer.save();
       } catch (error) { 
        console.log(error.message);
       }
       return res.status(200).json({trainer,message: "trainer saved successfully"}); 
    };

    export const loginTrainer = async (req, res, next) => {
        const { email, password } = req.body;
      
        try {
          const trainer = await Trainer.findOne({ email });
      
          if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found! Register instead' });
          }
      
          const isPasswordCorrect = bcrypt.compareSync(password, trainer.password);
      
          if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Wrong password' });
          }
      
          const token = jwt.sign( trainer.toJSON(), secret, { expiresIn: '1h' });
          res.cookie("LocalTrainer", token + trainer,{
            withCredentials: true,
            httpOnly: true,
            expiresIn: '1h'
          })
      
          return res.status(200).json({ trainer, message: 'Trainer logged in' });
        } catch (error) {
          console.log(error.message);
          return res.status(500).json({ message: 'Server error' });
        }
      };

      export const updateTrainer = async (req,res,next) =>{
        const id = req.params.id;
        const {courses,likes,comments,adress,profession} = req.body;
        let trainer;
        let imgURL;

        
        try {
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path, {
                    public_id: `profile_picture_${id}`,
                    folder: `localtrainer/avatar/trainer/${id}`
                })
    
                imgURL = result.secure_url;
    
            }
            trainer = await Trainer.findByIdAndUpdate({_id:id},{
                courses,
                likes,
                comments,
                adress,
                profession,
                imgURL
            })
            
            if(!trainer){
                return res.status(500).json({message:"Not able to update trainer"})
            }
            return res.status(200).json({trainer,message:"trainer updated"})
        } catch (error) {
            console.log(error.message);
        }
      };

export const getAllTrainers = async (req, res, next) => {
  let trainers;
  try {
    trainers = await Trainer.find();
    console.log(trainers);
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
    trainer = await Trainer.findOne({ _id: id });
  } catch (error) {
    console.log(error.message);
  }
  if (!trainer) {
    return res.status(404).json({ message: "No trainer found" });
  }
  return res.status(200).json(trainer);
};
