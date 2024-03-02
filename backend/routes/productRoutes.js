const express = require("express");
const router = express.Router();
const { protect } = require("../authMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers.js/productController");
const Product = require("../schema/productSchema");

router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
