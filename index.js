import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.config.js";
import userRouter from "./src/api/routes/user.routes.js";
import bookRouter from "./src/api/routes/book.routes.js";

//Load enviroment variables
dotenv.config();

//Server port
const PORT = process.env.PORT;

//Create server
const app = express();

//Configure server to acept JSON
app.use(express.json());

//Connection to DDBB
connectDB();

//User Routes
app.use("/api/user", userRouter);

//Book Routes
app.use("/api/book", bookRouter);

app.use((req, res, next) => {
  return res.status(404).json("Route not found");
});

app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});
