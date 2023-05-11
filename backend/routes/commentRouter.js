import express from "express";
import {addComment,updateComment,getAllComments,deleteComment} from "../controller/commentController.js"

const commentRouter = express.Router();

commentRouter.post("/add",addComment)

commentRouter.put("/update/:id",updateComment)

commentRouter.get("/:id",getAllComments)

commentRouter.delete("/delete/:id", deleteComment)


export default commentRouter;