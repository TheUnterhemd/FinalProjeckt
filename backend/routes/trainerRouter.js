import express from "express";
import {
  addTrainer,
  loginTrainer,
  getAllTrainers,
  getTrainer,
  updateTrainer,
  logoutTrainer,
  passwordChange,
  emailChange
} from "../controller/trainerController.js";
import { upload } from "../controller/cloudinaryController.js";
import { trainerValidator } from "../validation/validator.js";


const trainerRouter = express.Router();

trainerRouter.post("/register", upload.single("imgURL"), addTrainer);
trainerRouter.post("/login", loginTrainer);
trainerRouter.post("/logout", logoutTrainer); 

trainerRouter.put("/password/:id", trainerValidator, passwordChange)
trainerRouter.put("/email/:id", trainerValidator, emailChange)
trainerRouter.put("/update/:id",trainerValidator, upload.single("imageURL"), updateTrainer);

trainerRouter.get("/",getAllTrainers);
trainerRouter.get("/:id", getTrainer);

export default trainerRouter;
