import deleteImgCloudinary from "../../utils/deleteImg.js";
import { Book } from "../models/book.model.js";

export const getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return next(error);
  }
};

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    return res.status(200).json(books);
  } catch (error) {
    return next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const checkBookExists = await Book.findOne({ title: req.body.title });
    let imgUrl = null;

    if (checkBookExists) {
      return res
        .status(400)
        .json({ message: `this title: ${req.body.title} exists` });
    }

    if (req.file) {
      imgUrl = req.file.secure_url || req.file.path;
    }

    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      img: imgUrl,
    });

    const bookSaved = await newBook.save();

    const bookCreated = await Book.findById(bookSaved._id);

    return res.status(201).json({
      message: "Book created",
      book: bookCreated,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({ message: "Book not found" });
    }

    let imgUrl = book.img;

    if (imgUrl) {
      deleteImgCloudinary(imgUrl);
    }

    if (req.file) {
      imgUrl = req.file.secure_url || req.file.path;
    } else {
      imgUrl = null;
    }

    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      img: imgUrl,
    });

    const bookSaved = await newBook.save();

    const bookUpdated = await User.findById(bookSaved._id).populate("books");

    return res.status(201).json({
      message: "Book updated",
      user: bookUpdated,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({ message: "Book not found" });
    }

    if (book.img) {
      deleteImgCloudinary(book.img);
    }

    await Book.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: `Book with ID: ${id} has been deleted` });
  } catch (error) {
    return next(error);
  }
};
