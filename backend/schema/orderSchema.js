const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        orderSum: Number,
        deliveryType: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;