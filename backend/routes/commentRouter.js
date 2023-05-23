import express from "express";
import {addComment,updateComment,getAllComments,deleteComment} from "../controller/commentController.js"
import { userValidator } from "../validation/validator.js";

const commentRouter = express.Router();

commentRouter.post("/add",userValidator,addComment)

commentRouter.put("/update/:id",userValidator,updateComment)

commentRouter.get("/:id",getAllComments)

commentRouter.delete("/delete/:id",userValidator, deleteComment)


export default commentRouter;