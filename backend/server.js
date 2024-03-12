const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { protect } = require("./authMiddleware");
const Product = require("./schema/productSchema");
const Order = require("./schema/orderSchema");
// const multer = require("multer");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

require("dotenv").config();

// Подключаем маршруты
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Connection Error:", err));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

// Middleware для обработки ошибок
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app.use(errorHandler);

app.listen(PORT, () => console.log("Сервер запущен на порту: " + PORT));
