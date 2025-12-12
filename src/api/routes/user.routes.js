import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  login,
  deleteUser,
  updateUser,
} from "../controllers/user.controllers.js";
import uploadImage from "../../middlewares/file.middleware.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
import isValidUser from "../../middlewares/isValidUser.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";
import { validateFormUser } from "../../middlewares/validateForm.middleware.js";

const userRouter = express.Router();

userRouter.get("/getUser/:id", [isAuth, isValidUser], getUser);
userRouter.get("/getAllUsers", [isAuth, isAdmin], getAllUsers);
userRouter.post(
  "/createUser",
  [uploadImage.single("img"), validateFormUser],
  createUser
);
userRouter.post("/login", login);
userRouter.put(
  "/updateUser/:id",
  [isAuth, isValidUser, uploadImage.single("img"), validateFormUser],
  updateUser
);
userRouter.delete("/deleteUser/:id", [isAuth, isValidUser], deleteUser);

export default userRouter;
