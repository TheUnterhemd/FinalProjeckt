//imports
import express from 'express';
import { addUser } from '../controller/userController.js';

//set up router
const userRouter = express.Router();

//routes
userRouter.post('/register', addUser);

export default userRouter;
