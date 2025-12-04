import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const query = req.query.type ? { type: req.query.type } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
