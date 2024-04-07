const { Order } = require("../schema/orderSchema");
const { User } = require("../schema/userSchema");
const { Product } = require("../schema/productSchema");

const getOrders = async (req, res) => {
  const orders = await Order.find().populate("user");
};
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const user = req.user;

    const productsIds = orderData.orderProducts.map((product) => {
      return product.product;
    });

    const products = await Product.find({ _id: { $in: productsIds } });

    let sum = 0;

    products.forEach(
      (product) =>
        (sum +=
          product.price *
          orderData.orderProducts.find(
            (orderProduct) => orderProduct.product == product._id
          ).amount)
    );
    const newOrderData = {
      deliveryType: orderData.deliveryType,
      user: req.user._id,
      orderSum: sum,
      orderProducts: orderData.orderProducts,
    };

    const newOrder = await Order.create(newOrderData);

    if (newOrder && sum > 0)
      await User.findByIdAndUpdate(user._id, { cart: [] }, { new: true });
    res.status(201).json(newOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Could not create order" });
  }
};
module.exports = { createOrder, getOrders };
