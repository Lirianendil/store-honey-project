const express = require("express");
const { protect } = require("../authMiddleware");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
} = require("../controllers/userController");

router.get("/", protect, getUsers);
router.get("/search", searchUsers);
router.post("/", protect, createUser);
router.post("/cart", protect, addItemToCart);
router.patch("/cart/remove", protect, removeItemFromCart);
router.patch("/cart/update", protect, updateItemInCart);
router.get("/:userId", getUserById);
router.patch("/:userId", protect, updateUser);
router.delete("/:userId", protect, deleteUser);

module.exports = router;
