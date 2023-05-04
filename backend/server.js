import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import trainerRouter from './routes/trainerRouter.js';

dotenv.config()
const app = express();

mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@localtrainer.zdzuwkb.mongodb.net/?retryWrites=true&w=majority`)

app.use("/trainer", trainerRouter)


app.listen(process.env.PORT, () =>{
    console.log("Lauschangriff auf Port:"+ process.env.PORT);
})