import React, { useState } from 'react';
import {useCreateProductMutation, useUploadProductPhotoMutation} from "../redux/api/productApi";


const AddProductForm = () => {
    const [formData, setFormData] = useState({});
    const [createProduct] = useCreateProductMutation();
    const [uploadProductPhoto] = useUploadProductPhotoMutation();

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            photo: event.target.files[0]
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Сначала загружаем фотографию продукта
            const photoFormData = new FormData();
            photoFormData.append('photo', formData.photo);
            const { data: { url } } = await uploadProductPhoto(photoFormData);

            // После успешной загрузки фотографии создаем продукт
            await createProduct({ ...formData, photoUrl: url });

            // Очищаем форму после успешного создания продукта
            setFormData({});
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            {/* Другие поля формы для создания продукта */}
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
