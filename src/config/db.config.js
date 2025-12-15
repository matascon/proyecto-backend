import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to the BBDD successfully");
  } catch (error) {
    console.error("Error to connect to the BBDD", error);
  }
};

export default connectDB;
