import Trainer from "../models/trainerModel.js"


export const addTrainer = async (req, res) => {
    const {email,firstName,lastName, password} = req.body;
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
        const trainer = new Trainer({
            lastName ,
            firstName,
            email,
            password
        })
       try {
            trainer.save() 
       } catch (error) { 
        console.log(error.message);
       }
       return res.status(200).json({trainer,message: "trainer saved successfully"}); 
    };