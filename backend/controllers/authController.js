const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../schema/userSchema");
const Role = require("../schema/roleSchema")

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body; // Добавлено получение роли из запроса
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPwd, role });

    res.status(200).json({
      _id: user.id,
      email: user.email,
      role: user.role,
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

    if (await bcrypt.compare(password, user.password)) {

      res.status(200).json({
        _id: user.id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {

      res.status(401).json({ error: "Неверный пароль!" });
    }
  } else {

    res.status(401).json({ error: `Пользователь с email ${email} не найден` });
  }
};

module.exports = { login, register };
