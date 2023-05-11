import Trainer from "../models/trainerModel.js";

export const validator = (req,res,next) => {

    const userID = req.user._id
    Trainer.findById(userID).then((trainer) =>{
        if(trainer){console.log(trainer)}
        else{console.log("user");}
        next();

    }).catch((err)=>{
        console.log(err); next()})

};