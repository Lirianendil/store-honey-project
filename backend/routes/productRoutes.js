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
router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
