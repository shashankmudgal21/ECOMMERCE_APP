import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import auth from "./routes/authRoute.js";
import category from './routes/categoryRoute.js'
import productRoute  from "./routes/productRoute.js";
import cors from 'cors'
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/category", category);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send({
    message: "this is mern stack project",
  });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is starting at ${PORT}`);
});
