//imports
import express from 'express';
import { upload } from '../controller/cloudinaryController.js';
import { registerUser, loginUser, logoutUser, updateUser, getAllUsers, getUser } from '../controller/userController.js';

//set up router
const userRouter = express.Router();

//routes
userRouter.post("/register", upload.single("imgURL"), registerUser)
.post("/login", loginUser)
.post("/logout", logoutUser)
.post("/update/:id", upload.single("imgURL"), updateUser)
.post("/all", getAllUsers)
.post("/:id", getUser);

export default userRouter;
