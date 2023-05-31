import express from "express";
import {addCourse,updateCourse,getAllCourses,getCourse,deleteCourse,updateCurrentStudent} from "../controller/courseController.js"
import { upload } from '../controller/cloudinaryController.js';
import { trainerValidator } from "../validation/validator.js";
import { userValidator } from "../validation/validator.js";

const courseRouter = express.Router();

courseRouter.post("/add",trainerValidator,upload.single("imgURL"),addCourse)

courseRouter.put("/update/:id",trainerValidator,upload.single("imgURL"),updateCourse)
courseRouter.put("/update/student/:id", userValidator, updateCurrentStudent)

courseRouter.get("/",getAllCourses)
courseRouter.get("/:id", getCourse)

courseRouter.delete("/delete/:id",trainerValidator, deleteCourse)


export default courseRouter;