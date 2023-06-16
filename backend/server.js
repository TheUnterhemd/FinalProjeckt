import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import trainerRouter from "./routes/trainerRouter.js";
import userRouter from "./routes/userRouter.js";
import courseRouter from "./routes/courseRouter.js";
import commentRouter from "./routes/commentRouter.js";
import searchRouter from "./routes/searchRouter.js";
import cookieParser from "cookie-parser";
import tokenRouter from "./routes/tokenRouter.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const whitelist = ["https://localtrainer.vercel.app/"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS issues"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

mongoose.connect(
  `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_CONNECTION}/${process.env.MDB_COLLECTION}${process.env.MDB_QUERYPARAMS}`
);

app.use("/trainer", trainerRouter);
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/comment", commentRouter);
app.use("/search", searchRouter);
app.use("/token", tokenRouter);

app.listen(process.env.PORT, () => {
  console.log("Lauschangriff auf Port:" + process.env.PORT);
});
