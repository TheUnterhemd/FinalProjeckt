import express from "express";
import {refresh} from "../controller/refreshController.js"
import { confirmMail } from "../validation/verifyMail.js";

const tokenRouter = express.Router();

tokenRouter.post("/",refresh)
tokenRouter.get("/verify/:token",confirmMail);


export default tokenRouter;