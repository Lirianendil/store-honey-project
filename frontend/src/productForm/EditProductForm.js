import React, { useState } from 'react';
import { useEditProductMutation, useUploadProductPhotoMutation } from "../redux/api/productApi";
import ProductPhotoUploader from './ProductPhotoUploader'; // Импортируем компонент ProductPhotoUploader

const EditProductForm = ({ productId, initialData }) => {
    const [formData, setFormData] = useState(initialData);
    const [photoUrl, setPhotoUrl] = useState(''); // Состояние для хранения URL фотографии
    const [editProduct] = useEditProductMutation();

    const handlePhotoUpload = (url) => {
        setPhotoUrl(url); // Обновляем URL фотографии
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Передаем URL фотографии в formData перед отправкой запроса на редактирование продукта
            await editProduct({ productId, productData: { ...formData, photoUrl } });

        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ProductPhotoUploader onPhotoUpload={handlePhotoUpload} /> {/* Передаем функцию для обновления URL фотографии */}
            {/* Другие поля формы для редактирования продукта */}
            <button type="submit">Edit Product</button>
        </form>
    );
};

export default EditProductForm;

