import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "../api/models/book.model.js";
import { dataBooks } from "../data/dataBooks.js";

dotenv.config();

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Conected to the BBDD successfully");

    const booksOnBBDD = await Book.find();

    if (booksOnBBDD.length) {
      console.log("Cleaning old data");
      await Book.collection.drop();
    }

    console.log("Inserting new books");
    await Book.insertMany(dataBooks);

    console.log("Seed's done successfully");
  } catch (error) {
    console.log("Error to connect to the BBDD", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedBooks();
