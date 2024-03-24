import React, { useState } from 'react';
import {useEditProductMutation, useUploadProductPhotoMutation} from "../redux/api/productApi";


const EditProductForm = ({ productId, initialData }) => {
    const [formData, setFormData] = useState(initialData);
    const [editProduct] = useEditProductMutation();
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
            // Если пользователь выбрал новую фотографию, загружаем ее
            if (formData.photo) {
                const photoFormData = new FormData();
                photoFormData.append('photo', formData.photo);
                const { data: { url } } = await uploadProductPhoto(photoFormData);
                setFormData({
                    ...formData,
                    photoUrl: url
                });
            }

            // После загрузки фотографии или без нее выполняем редактирование продукта
            await editProduct({ productId, productData: formData });

        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            {/* Другие поля формы для редактирования продукта */}
            <button type="submit">Edit Product</button>
        </form>
    );
};

export default EditProductForm;
