import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  type: String, 
  name: String,
  price: Number,
  description: String,
  image: String,
}, { collection: "products" }); 

export default mongoose.model("Product", productSchema);
