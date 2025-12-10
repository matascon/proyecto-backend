import express from "express";
import { createBook, getAllBooks } from "../controllers/book.controllers.js";
import { uploadImage } from "../../middlewares/file.middleware.js";

const bookRouter = express.Router();

bookRouter.post("/createBook", uploadImage.single("img"), createBook);
bookRouter.get("/getAllBooks", getAllBooks);

export default bookRouter;
