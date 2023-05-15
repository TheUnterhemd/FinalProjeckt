import express from "express";
import { search } from "../controller/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/", search);

export default searchRouter;
