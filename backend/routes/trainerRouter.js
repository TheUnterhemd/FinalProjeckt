import express from "express";
import {addTrainer, loginTrainer, getAllTrainers,getTrainer,updateTrainer} from "../controller/trainerController.js"

const trainerRouter = express.Router();

trainerRouter.post("/register",addTrainer)
trainerRouter.post("/login",loginTrainer)

trainerRouter.put("/update/:id",updateTrainer)

trainerRouter.get("/",getAllTrainers)
trainerRouter.get("/trainer/:id", getTrainer)


export default trainerRouter;