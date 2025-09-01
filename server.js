import express from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/user.routes.js";
import cartRoutes from "./Routes/cart.routes.js";
import { productRoutes } from "./Routes/products.routes.js";
import dotenv from "dotenv";
dotenv.config();
console.log("JWT_SECRET:", process.env.SECRET_KEY);

const app = new express();
let port = process.env.PORT;
let mongoURL = process.env.MONGO_URI;
app.use(express.json());
productRoutes(app);
userRoutes(app);
cartRoutes(app);
app.listen(port, () => {
  console.log(`Server is running ob port ${port}`);
});

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("open", () => {
  console.log("DataBase Connected Successfully");
});

db.on("error", () => {
  console.log("Some Error Occured while conneting with DataBase");
});
