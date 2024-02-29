const express = require("express");
const User  = require("../schema/userSchema");
const router = express.Router();


router.post("/", async (req, res) => {
    const userData = req.body;
    const user = await User.create(userData);
    res.status(201).json(user);
});

router.get("/", async (req, res) => {
    const users = await  User.find();
    res.status(200).json(users);
});

router.get("/search", async (req, res) => {
    const { searchString } = req.query;
    const users = await User.find({
        $or: [
            { name: new RegExp(searchString, "i") },
            { jobTitle: new RegExp(searchString, "i") },
        ],
    });
    res.status(200).json(users);
});

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
});

router.patch("/:userId", async (req, res) => {
    const { userId } = req.params;
    const userData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    res.status(200).json(updatedUser);
});

router.delete("/:userId", async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json(user);
});

module.exports = router;
