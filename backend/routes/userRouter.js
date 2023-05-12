//imports
import express from 'express';
import { upload } from '../controller/cloudinaryController.js';
import { registerUser, loginUser, logoutUser, updateUser, getUser } from '../controller/userController.js';

//set up router
const userRouter = express.Router();

//routes
userRouter.post("/register", upload.single("imgURL"), registerUser)
.post("/login", loginUser)
.post("/logout", logoutUser)
.put("/update/:id", upload.single("imgURL"), updateUser)
.get("/:id", getUser);

export default userRouter;
