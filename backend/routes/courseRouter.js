import express from "express";
import {addCourse,updateCourse,getAllCourses,getCourse,deleteCourse} from "../controller/courseController.js"
import { upload } from '../controller/cloudinaryController.js';

const courseRouter = express.Router();

courseRouter.post("/add",upload.single("imageURL"),addCourse)

courseRouter.put("/update/:id",upload.single("imageURL"),updateCourse)

courseRouter.get("/",getAllCourses)
courseRouter.get("/:id", getCourse)

courseRouter.delete("/delete/:id", deleteCourse)


export default courseRouter;