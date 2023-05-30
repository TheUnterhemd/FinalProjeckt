import express from "express";
import {refresh} from "../controller/refreshController.js"

const refreshRouter = express.Router();

refreshRouter.post("/",refresh)


export default refreshRouter;