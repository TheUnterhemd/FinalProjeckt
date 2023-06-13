//imports
import express from 'express';
import { upload } from '../controller/cloudinaryController.js';
import { registerUser, loginUser, logoutUser, updateUser, getUser, getUserByName, removeBookedCourse,passwordChange,emailChange } from '../controller/userController.js';
import { userValidator } from "../validation/validator.js";
import { trainerValidator } from '../validation/validator.js';

//set up router
const userRouter = express.Router();

//routes
userRouter.post("/register", upload.single("imgURL"), registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)

userRouter.put("/update/:id",userValidator, upload.single("imgURL"), updateUser)
userRouter.put("/email/:id", userValidator, emailChange)
userRouter.put("/password/:id", userValidator, passwordChange)
userRouter.delete("/update/:courseId/:id", trainerValidator, removeBookedCourse)

userRouter.get("/:id", getUser)
userRouter.get("/name", getUserByName)

export default userRouter;
