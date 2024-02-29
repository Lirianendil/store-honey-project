const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { protect } = require("./authMiddleware");
const  Product  = require("./schema/productSchema");
const Order  = require("../backend/schema/orderSchema");
const multer = require("multer");
const userRoutes = require("../backend/routes/userRoutes");

require('dotenv').config();

// Подключаем маршруты
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.error("Connection Error:", err));

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/products",  productRoutes); // Защищаем маршруты продуктов
app.use("/orders",  orderRoutes); // Защищаем маршруты заказов

// Обработка загрузки изображений
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Папка, куда будут сохраняться изображения
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg"); // Генерация уникального имени файла
  },
});

const upload = multer({ storage: storage });

app.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, amount } = req.body;
    const imageUrl = req.file.path;
    const product = await Product.create({
      name,
      description,
      price,
      amount,
      imageUrl,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Middleware для обработки ошибок
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

app.use(errorHandler);



app.listen(PORT, () => console.log("Сервер запущен на порту: " + PORT));
