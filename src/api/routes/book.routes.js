import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/book.controllers.js";
import uploadImage from "../../middlewares/file.middleware.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";
import { validateFormBook } from "../../middlewares/validateForm.middleware.js";

const bookRouter = express.Router();

bookRouter.get("/getAllBooks", getAllBooks); // ESTAS DOS RUTAS SON
bookRouter.get("/getBook/:id", getBook); // ACCESIBLES PARA CALQUIER PERSONA
bookRouter.post(
  "/createBook",
  [isAuth, isAdmin, uploadImage.single("img"), validateFormBook],
  createBook
);
bookRouter.put(
  "/updateBook/:id",
  [isAuth, isAdmin, uploadImage.single("img"), validateFormBook],
  updateBook
);
bookRouter.delete("/deleteBook/:id", [isAuth, isAdmin], deleteBook);

export default bookRouter;
