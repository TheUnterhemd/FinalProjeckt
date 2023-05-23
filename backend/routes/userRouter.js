//imports
import express from 'express';
import { upload } from '../controller/cloudinaryController.js';
import { registerUser, loginUser, logoutUser, updateUser, getUser, getUserByName } from '../controller/userController.js';
import { userValidator } from "../validation/validator.js";

//set up router
const userRouter = express.Router();

//routes
userRouter.post("/register", upload.single("imgURL"), registerUser)
.post("/login", loginUser)
.post("/logout", logoutUser)
.put("/update/:id",userValidator, upload.single("imgURL"), updateUser)
.get("/:id", getUser)
.get("/name", getUserByName)

export default userRouter;
