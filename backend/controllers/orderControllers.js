const Order = require("../schema/orderSchema");

exports.createOrder = async (req, res) => {
    try {
        const ordersData = req.body;
        return ordersData
        //  логика создания заказа
    } catch (error) {
        res.status(500).json({ error: error?.message || error });
    }

};

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const updateData = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};