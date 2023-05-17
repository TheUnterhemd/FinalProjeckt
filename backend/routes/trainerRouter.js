import express from "express";
import {
  addTrainer,
  loginTrainer,
  getAllTrainers,
  getTrainer,
  updateTrainer,
  logoutTrainer
} from "../controller/trainerController.js";
import { upload } from "../controller/cloudinaryController.js";
import { validator } from "../validation/validator.js";


const trainerRouter = express.Router();

trainerRouter.post("/register", upload.single("imgURL"), addTrainer);
trainerRouter.post("/login", loginTrainer);
trainerRouter.post("/logout", logoutTrainer); 


trainerRouter.put("/update/:id", upload.single("imageURL"), updateTrainer);

trainerRouter.get("/",validator, getAllTrainers);
trainerRouter.get("/:id", getTrainer);

export default trainerRouter;
