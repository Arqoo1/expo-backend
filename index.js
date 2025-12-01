import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "API working!" });
});


app.get("/products", async (req, res) => {
  try {
    const query = req.query.type ? { type: req.query.type } : {};
    const products = await Product.find(query); 
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(4000, "0.0.0.0", () => console.log("Server running on port 4000"));
