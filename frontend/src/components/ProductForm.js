import React, { useState } from "react";
import { useCreateProductMutation } from "../redux/api/productApi";
import { useUser } from "../hooks/useUser";

const ProductForm = () => {
  const user = useUser();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [amount, setAmount] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const [createProduct, { data: productData }] = useCreateProductMutation();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    // Приделываем картинку
    formData.append("image", image);
    formData.append("amount", amount);
    formData.append("token", user.token);

    try {
      // Handle success or redirect
      createProduct(formData);
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
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
        onChange={handleFileChange}
        multiple="true"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ProductForm;
