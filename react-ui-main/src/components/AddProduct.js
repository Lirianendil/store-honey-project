import React, { useState } from "react";
import { useCreateProductMutation } from "../redux/api/productApi";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [image, setImage] = useState(null);

    const [createProduct] = useCreateProductMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("amount", amount);
        formData.append("image", image); // Добавление изображения в FormData
        try {
            await createProduct(formData);
            // Очистка полей формы после успешного добавления продукта
            setName("");
            setDescription("");
            setPrice("");
            setAmount("");
            setImage(null);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])} // Обработка выбора изображения
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;