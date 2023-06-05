import nodemailer from   'nodemailer';
import dotenv from 'dotenv';
import VerifyToken from '../models/verifyToken.js';
import User from '../models/userModel.js';
import Trainer from '../models/trainerModel.js';

dotenv.config();

//send mail in user- and trainerController
export const verifyMailer = async (email,link) =>
{
    try {
        let transporter = nodemailer.createTransport({
            service: "smtp.sendgrid.net",
            port: 465,
            auth:{
                user: process.env.NODEMAIL_USER,
                pass: process.env.NODEMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

    let mail = await transporter.sendMail({
        from: process.env.NODEMAIL_USER,
        to: email,
        subject: 'verify your email',
        text: ' welcome to LocalTrainer.com',
        html:`
        <div>
        <a href=${link}>Click here to activate your account</a>
        </div>`
    })
    console.log('mail sended successfully');
}catch(error) {
    console.log(error.message);
}};

//confirm mail in tokenRouter
export const confirmMail = async (req,res) =>{
    try {
        const token = await VerifyToken.findOne({token: req.params.token});

        if(!token){ res.status(403).send("no token found")}

        const user = await User.updateOne({_id: token.userID},{$set:{verified: true}});
            
            if(!user){
                const trainer = await Trainer.updateOne({_id: token.userID},{$set:{verified:true}});

                if(!trainer && !user){
                    res.status(403).send("no user or trainer found");
                }
            
            }

            await TokenExpiredError.findByIdAndRemove(token._id)
            res.status(200).send("Email verified")
        }
     catch (error) {
        console.log(error.message);
    }
}