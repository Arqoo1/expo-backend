import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  type: String, // "phone" or "laptop"
  name: String,
  price: Number,
  description: String,
  image: String,
}, { collection: "products" }); // <- match your real collection name exactly

export default mongoose.model("Product", productSchema);
