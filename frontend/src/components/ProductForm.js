import { useState } from "react";
import { useCreateProductMutation } from "../redux/api/productApi";
import { useUser } from "../hooks/useUser";
import "./ProductForm.css";

const ProductForm = () => {
  const user = useUser();

  const [productData, setProductData] = useState({
    name: null,
    description: null,
    amount: null,
    price: null,
    image: null,
  });

  console.log("DATA =>", productData);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const [createProduct] = useCreateProductMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("amount", productData.amount);
    formData.append("price", productData.price);
    formData.append("image", productData.image);
    formData.append("token", user?.token);

    createProduct(formData);
  };

  return (
    <form className="product_form" onSubmit={handleSubmit}>
      <div className="product_form-inputs">
        <div className="product_form-row">
          Name:
          <input
            className="form-control w-100"
            type="text"
            name="name"
            placeholder="name"
            value={productData?.name}
            onChange={handleChange}
          />
        </div>
        <div className="product_form-row">
          Description:
          <input
            className="form-control w-100"
            type="text"
            name="description"
            placeholder="description"
            value={productData?.description}
            onChange={handleChange}
          />
        </div>
        <div className="product_form-row">
          Price:
          <input
            className="form-control w-100"
            type="text"
            name="price"
            placeholder="price"
            value={productData?.price}
            onChange={handleChange}
          />
        </div>
        <div className="product_form-row">
          Amount:
          <input
            className="form-control w-100"
            type="text"
            name="amount"
            placeholder="amount"
            value={productData?.amount}
            onChange={handleChange}
          />
        </div>
        <div className="product_form-row">
          Image:
          <input
            className="form-control w-100"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProductData({ ...productData, image: e.target.files[0] })
            }
          />
        </div>
        {/* <div>
          Posters:
          <input type="file" multiple={true} accept="image/*" />
        </div> */}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
