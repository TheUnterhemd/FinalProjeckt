//imports
import express from 'express';
import { upload } from '../controller/cloudinaryController.js';
import { registerUser, loginUser, logoutUser } from '../controller/userController.js';

//set up router
const userRouter = express.Router();

//routes
userRouter.post("/register", upload.single("profilePicture"), registerUser)
.post("/login", loginUser)
.post("/logout", logoutUser);

export default userRouter;
