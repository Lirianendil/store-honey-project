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
  editProduct,
} = require("../controllers/productController");
const Product = require("../schema/productSchema");

router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/:id", protect, getProductById);
router.patch("/:productId", protect, editProduct);
router.patch("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
