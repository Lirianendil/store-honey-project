const express = require("express");
const router = express.Router();
const { protect } = require("../authMiddleware");
const {
  createOrder,
  getOrderById,
  updateOrder,
} = require("../controllers/orderControllers");

router.post("/createOrder", protect, createOrder);
router.get("/:orderId", getOrderById);
router.patch("/:orderId", protect, updateOrder);
//roll protect create
module.exports = router; 
