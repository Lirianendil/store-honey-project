const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Название роли
    description: { type: String }, // Описание роли
    value: { type: String, unique: true, required: true }, // Уникальное значение роли
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
