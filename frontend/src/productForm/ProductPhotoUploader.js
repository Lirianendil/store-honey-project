import React, { useState } from 'react';
import {useUploadProductPhotoMutation} from "../redux/api/productApi";


const ProductPhotoUploader = () => {
  const [uploadProductPhoto] = useUploadProductPhotoMutation();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);
    try {
      await uploadProductPhoto(formData);
      onPhotoUpload(url);
      console.log("Photo uploaded successfully");
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <div>
      {/* Добавляем атрибут accept=".jpg" */}
      <input type="file" accept=".jpg" onChange={handleFileUpload} />
    </div>
  );
};

export default ProductPhotoUploader;
