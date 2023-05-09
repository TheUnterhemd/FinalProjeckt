import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import trainerRouter from './routes/trainerRouter.js';
import userRouter from './routes/userRouter.js';
import courseRouter from './routes/courseRouter.js';

dotenv.config()
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_CONNECTION}/${process.env.MDB_COLLECTION}${process.env.MDB_QUERYPARAMS}`)

app.use("/trainer", trainerRouter)
app.use('/user', userRouter)
app.use('/course', courseRouter)


app.listen(process.env.PORT, () =>{
    console.log("Lauschangriff auf Port:"+ process.env.PORT);
})