const express = require("express");
const { protect } = require("../authMiddleware");
const { createOrder, getOrders } = require("../controllers/orderControllers");
const { getProductDetails } = require("../controllers/productController");
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);

module.exports = router;
