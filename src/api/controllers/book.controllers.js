import { Book } from "../models/book.model.js";

export const createBook = async (req, res, next) => {
  try {
    let imgUrl = null;
    if (req.file) {
      imgUrl = req.file.secure_url || req.file.path;
    }

    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      img: imgUrl,
    });

    const savedBook = await newBook.save();

    const createdBook = await Book.findById(savedBook._id);

    return res.status(201).json({
      message: "Book created",
      book: createdBook,
    });
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
