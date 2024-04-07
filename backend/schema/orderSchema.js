const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        amount: Number,
      },
    ],
    orderSum: Number,
    deliveryType: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
