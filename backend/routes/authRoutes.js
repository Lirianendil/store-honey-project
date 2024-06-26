const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../schema/userSchema");
const {register, login} = require("../controllers.js/authController");
const router = express.Router();

// router.post("/register", async (req, res) => {
//     // try {
//     //     console.log("REGISTER")
//     //     const { name, password, email } = req.body;
//     //     const salt = await bcrypt.genSalt(10);
//     //     const hashedPwd = await bcrypt.hash(password, salt);
//     //
//     //     const existedUser = await User.findOne({ email });
//     //
//     //     if (existedUser) {
//     //         return res.status(401).json({ message: 'User already exists', existedUser });
//     //     }
//     //
//     //     const user = await User.create({ password: hashedPwd, name, email });
//     //
//     //     res.status(200).json({
//     //         id: user._id,
//     //         name: user.name,
//     //         password: user.password,
//     //         email: user.email,
//     //         age: user.age,
//     //         token: jwt.sign({ id: user._id }, "abc123", { expiresIn: "7d" }),
//     //     });
//     // } catch (error) {
//     //     res.status(401).json(error);
//     // }
//     // res.status(200).json("REGISTER")
// });

router.post("/register", register)
router.post("/login", login)

module.exports = router;
