import Trainer from "../models/trainerModel.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()


export const addTrainer = async (req, res) => {
    const {courses,email,firstName,lastName, password} = req.body;
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
        const hashedPW = bcrypt.hashSync(password,Number(process.env.SALT_ROUNDS))
        const trainer = new Trainer({
            lastName ,
            firstName,
            email,
            password:hashedPW,
            courses
        })
       try {
            trainer.save() 
       } catch (error) { 
        console.log(error.message);
       }
       return res.status(200).json({trainer,message: "trainer saved successfully"}); 
    };

    export const loginTrainer = async (req, res, next) => {
        const { mail, password } = req.body;
      
        try {
          const trainer = await Trainer.findOne({ mail });
      
          if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found! Register instead' });
          }
      
          const isPasswordCorrect = bcrypt.compareSync(password, trainer.password);
      
          if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Wrong password' });
          }
      
          const token = jwt.sign( trainer.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' });
          res.cookie("LocalTrainer", token+trainer,{
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
        const {courses} = req.body;
        let trainer;
        console.log(id);
        console.log(courses);
        try {
            trainer = await Trainer.findByIdAndUpdate({_id:id},{
                courses
            })
            if(!trainer){
                return res.status(500).json({message:"Not able to update trainer"})
            }
            return res.status(200).json({trainer,message:"trainer updated"})
        } catch (error) {
            console.log(error.message);
        }

      }






      export const getAllTrainers = async (req, res, next) => {
        let trainers;
        try {
            trainers = await Trainer.find();
            console.log(trainers);
        } catch (error) {
            console.log(error.message);
        }
        if(!trainers){
            return res.status(404).json({message: "No trainers found"})
        }
        return res.status(200).json(trainers);
        };

        export const getTrainer = async (req, res, next) => {
            let trainer;
            const id = req.params.id;
            try {
                trainer = await Trainer.find({_id:id});
                console.log(trainer);
            } catch (error) {
                console.log(error.message);
            }
            if(!trainer){
                return res.status(404).json({message: "No trainer found"})
            }
            return res.status(200).json(trainer);
            };
