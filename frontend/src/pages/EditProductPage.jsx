import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import {
  useEditProductMutation,
  useGetProductDetailsQuery,
  useUploadProductPhotoMutation,
} from "../redux/api/productApi";

const EditProductPage = () => {
  const [file, setFile] = useState(null);

  const { productId } = useParams();
  const user = useUser();

  const { data: productData } = useGetProductDetailsQuery({
    token: user?.token,
    productId: productId,
  });

  const [formData, setFormData] = useState(productData || {});

  useEffect(() => {
    if (productData) {
      setFormData(productData);
    }
  }, [productData]);

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const [editProduct] = useEditProductMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("description", formData.description);
    newFormData.append("amount", formData.amount);
    newFormData.append("price", formData.price);
    newFormData.append("image", formData.image);
    newFormData.append("token", user?.token);
    newFormData.append("productId", productId);

    editProduct(newFormData);
  };

  return (
    <main>
      <div>
        Name:{" "}
        <input
          type="text"
          value={formData?.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        Description:{" "}
        <input
          type="text"
          value={formData?.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
      </div>
      <div>
        Price:{" "}
        <input
          type="text"
          value={formData?.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </div>
      <div>
        Amount:{" "}
        <input
          type="text"
          value={formData?.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </div>
      <div>
        Photo:{" "}
        <input type="file" multiple={false} onChange={handleFileChange} />
      </div>
      <button onClick={handleSubmit}>Edit</button>
    </main>
  );
};

export default EditProductPage;
