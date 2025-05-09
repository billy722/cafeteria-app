const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /products

// Ruta GET básica
router.get('/', (req, res) => {
  res.json({ message: "Listado de productos (Hello World)" });
});

// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;