import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";
import deleteImgCloudinary from "../../utils/deleteImg.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("books");

    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("books");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const checkUserExists = await User.findOne({ email: req.body.email });
    let imgUrl = null;

    if (checkUserExists) {
      return res
        .status(400)
        .json({ message: `this email: ${req.body.email} exists` });
    }

    if (req.file) {
      imgUrl = req.file.secure_url || req.file.path;
    }

    const books = Array.isArray(req.body.books)
      ? req.body.books
      : [req.body.books];

    const genuineBooks = [...new Set(books)];

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      img: imgUrl,
      books: genuineBooks,
    });

    const userSaved = await newUser.save();

    const userCreated = await User.findById(userSaved._id).populate("books");

    return res.status(201).json({
      message: "User created",
      user: userCreated,
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordOk = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordOk) {
      return res.status(400).json({ message: "Wrond Password" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      user: user.userName,
      token: token,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    let imgUrl = user.img;

    if (req.user.role === "user" && req.body.role === "admin") {
      return res.status(401).json({ message: "Unauthorized to change role" });
    }

    if (imgUrl) {
      deleteImgCloudinary(imgUrl);
    }

    if (req.file) {
      imgUrl = req.file.secure_url || req.file.path;
    } else {
      imgUrl = null;
    }

    const books = Array.isArray(req.body.books)
      ? req.body.books
      : [req.body.books];

    const genuineBooks = [...new Set(books)];

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      img: imgUrl,
      role: req.body.role,
      books: genuineBooks,
    });

    await User.findByIdAndDelete(id);
    const userSaved = await newUser.save();

    const userUpdated = await User.findById(userSaved._id).populate("books");

    return res.status(201).json({
      message: "User updated",
      user: userUpdated,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.img) {
      deleteImgCloudinary(user.img);
    }

    await User.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: `User with ID: ${id} has been deleted` });
  } catch (error) {
    return next(error);
  }
};
