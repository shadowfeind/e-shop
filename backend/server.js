import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.listen(5000, console.log("Server running in port 5000"));

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

app.get("/", (req, res) => res.send("API is running"));
