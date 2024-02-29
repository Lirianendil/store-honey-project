const express = require("express");
const router = express.Router();
const { protect } = require("../authMiddleware");
const { createOrder, getOrderById, updateOrder } = require("../controllers.js/orderControllers");
const Order = require("../schema/orderSchema");

router.post("/createOrder", createOrder);
router.get("/:orderId", getOrderById);
router.patch("/:orderId", updateOrder);
//roll protect create
module.exports = router;