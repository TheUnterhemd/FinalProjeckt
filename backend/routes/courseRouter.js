import express from "express";
import {addCourse,updateCourse,getAllCourses,getCourse,deleteCourse} from "../controller/courseController.js"
import { upload } from '../controller/cloudinaryController.js';
import { trainerValidator } from "../validation/validator.js";

const courseRouter = express.Router();

courseRouter.post("/add",trainerValidator,upload.single("imgURL"),addCourse)

courseRouter.put("/update/:id",trainerValidator,upload.single("imgURL"),updateCourse)

courseRouter.get("/",getAllCourses)
courseRouter.get("/:id", getCourse)

courseRouter.delete("/delete/:id",trainerValidator, deleteCourse)


export default courseRouter;