import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import VerifyToken from '../models/verifyToken.js';
import User from '../models/userModel.js';
import Trainer from '../models/trainerModel.js';

dotenv.config();

//send mail in user- and trainerController
export const verifyMailer = async (email, link) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
      const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Verify Your Email',
        text: 'Welcome to LocalTrainer.com',
        html: `<div><a href=${link}>Click here to activate your account</a></div>`
      };
  
      await sgMail.send(msg);
      console.log('Mail sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

//confirm mail in tokenRouter
export const confirmMail = async (req, res) => {
    try {
        const token = await VerifyToken.findOne({ verifyToken: req.params.token });

        if (!token) {
            return res.status(403).send("No token found");
        }

        let updateResult;

        const trainer = await Trainer.findOne({ _id: token.userID });
        if (trainer) {
            updateResult = await Trainer.updateOne(
                { _id: token.userID },
                { $set: { verified: true } }
            );
        } else {
            updateResult = await User.updateOne(
                { _id: token.userID },
                { $set: { verified: true } }
            );
        }

        if (!updateResult) {
            return res.status(403).send("No user or trainer found");
        }

        await VerifyToken.findByIdAndRemove(token._id);
        return res.status(200).send("Email verified");
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error");
    }
};