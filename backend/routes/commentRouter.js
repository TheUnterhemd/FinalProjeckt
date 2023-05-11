import express from "express";
import {addComment,updateComment,getAllComments,deleteComment} from "../controller/commentController.js"

const commentRouter = express.Router();

commentRouter.post("/add",addComment)

commentRouter.put("/update/:id",updateComment)

commentRouter.get("/",getAllComments)
commentRouter.get("/:id", getComment)

commentRouter.delete("/delete/:id", deleteComment)


export default commentRouter;