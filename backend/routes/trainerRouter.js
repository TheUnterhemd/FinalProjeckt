import express from "express";
import {addTrainer} from "../controler/trainerController.js"

const trainerRouter = express.Router();

trainerRouter.post("/register",addTrainer)


export default trainerRouter;