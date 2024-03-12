const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../schema/userSchema");
const Role = require("../schema/roleSchema");

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    const user = await User.create({ ...req.body, password: hashedPwd });

    res.status(200).json({
      _id: user.id,
      email: user.email,
      age: user.age,
      jobTitle: user.jobTitle,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    // User found, now check password
    if (await bcrypt.compare(password, user.password)) {
      // Passwords match, generate token and send response
      res.status(200).json({
        _id: user.id,
        email: user.email,
        age: user.age,
        jobTitle: user.jobTitle,
        token: generateToken(user._id),
      });
    } else {
      // Passwords don't match
      res.status(401).json({ error: "Неверный пароль!" });
    }
  } else {
    // User not found
    res.status(401).json({ error: `Пользователь с именем ${email} не найден` });
  }
};

module.exports = { login, register };
