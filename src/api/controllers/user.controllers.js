import { User } from "../models/user.model.js";

export const createUser = async (req, res, next) => {
  try {
    let imgUrl = null;

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

    const savedUser = await newUser.save();

    const createdUser = await User.findById(savedUser._id).populate("books");

    return res.status(201).json({
      message: "User created",
      user: createdUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("books");

    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};
