import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import {
  useEditProductMutation,
  useGetProductDetailsQuery,
  useUploadProductPhotoMutation,
} from "../redux/api/productApi";

const EditProductPage = () => {
  const { productId } = useParams();
  const user = useUser();

  const { data: productData } = useGetProductDetailsQuery({
    token: user?.token,
    productId: productId,
  });

  const [newProductData, setNewProductData] = useState(productData || {});
  const [file, setFile] = useState(null);
  const [uploadProductPhoto] = useUploadProductPhotoMutation();
  const [editProduct] = useEditProductMutation();

  useEffect(() => {
    if (productData) {
      setNewProductData(productData);
    }
  }, [productData]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    console.log("clicked");
    try {
      if (file) {
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("productId", productId);
        const response = await uploadProductPhoto(formData);
        if (response.data && response.data.url) {
          const { url } = response.data;
          setNewProductData({ ...newProductData, photoUrl: url });
        } else {
          console.error("Error uploading photo: response data is invalid");
        }
      }
      await editProduct({
        token: user?.token,
        productId: productId,
        productData: newProductData,
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  console.log(`http://localhost:8080/${newProductData?.image}`);

  return (
    <main>
      <div>
        Name:{" "}
        <input
          type="text"
          value={newProductData?.name}
          onChange={(e) =>
            setNewProductData({ ...newProductData, name: e.target.value })
          }
        />
      </div>
      <div>
        Description:{" "}
        <input
          type="text"
          value={newProductData?.description}
          onChange={(e) =>
            setNewProductData({
              ...newProductData,
              description: e.target.value,
            })
          }
        />
      </div>
      <div>
        Price:{" "}
        <input
          type="text"
          value={newProductData?.price}
          onChange={(e) =>
            setNewProductData({ ...newProductData, price: e.target.value })
          }
        />
      </div>
      <div>
        Amount:{" "}
        <input
          type="text"
          value={newProductData?.amount}
          onChange={(e) =>
            setNewProductData({ ...newProductData, amount: e.target.value })
          }
        />
      </div>
      <div>
        Photo:{" "}
        <input
          type="file"
          value={"http://localhost:8080/uploads/1713006053936.jpg"}
          onChange={handleFileChange}
        />
      </div>
      <button onClick={handleSubmit}>Edit</button>
    </main>
  );
};

export default EditProductPage;
