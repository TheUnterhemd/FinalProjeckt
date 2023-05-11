import express from "express";
//import {addCourse,updateCourse,getAllCourses,getCourse,deleteCourse} from "../controller/courseController.js"

const commentRouter = express.Router();

commentRouter.post("/add",addComment)

commentRouter.put("/update/:id",updateComment)

commentRouter.get("/",getAllComments)
commentRouter.get("/:id", getComment)

commentRouter.delete("/delete/:id", deleteComment)


export default commentRouter;