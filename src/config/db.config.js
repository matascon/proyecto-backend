import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Conectado con éxito a la BBDD");
  } catch (error) {
    console.error("Error al conectarse a la BBDD", error);
  }
};

export default connectDB;
