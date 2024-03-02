const Product = require("../schema/productSchema");

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error?.message || error });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error?.message || error });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error?.message || error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error?.message || error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.status(200).json("ok");
    } catch (error) {
        res.status(500).json({ error: error?.message || error });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { searchString } = req.query;
        const products = await Product.find({
            $or: [
                { name: new RegExp(searchString, "i") },
                { description: new RegExp(searchString, "i") },
            ],
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error?.message || error });
    }
};