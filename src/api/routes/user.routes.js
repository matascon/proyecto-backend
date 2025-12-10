import express from "express";
import { createUser, getAllUsers } from "../controllers/user.controllers.js";
import { uploadImage } from "../../middlewares/file.middleware.js";

const userRouter = express.Router();

userRouter.post("/createUser", uploadImage.single("img"), createUser);
userRouter.get("/getAllUsers", getAllUsers);

export default userRouter;
