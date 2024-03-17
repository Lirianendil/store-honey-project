import { useParams } from "react-router-dom";
import {
  useEditProductMutation,
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from "../../redux/api/productApi";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";

const EditProductPage = () => {
  const { productId } = useParams();
  const user = useUser();

  const { data: productData, isFetching: productIsFetching } =
    useGetProductDetailsQuery({ token: user?.token, productId: productId });

  const [newProductData, setNewProductData] = useState(productData || {});

  useEffect(() => {
    if (productData) {
      setNewProductData(productData);
    }
  }, [productData]);

  const [editProduct] = useEditProductMutation();

  return (
    <main>
      <div>
        Name:{" "}
        <input
          type="text"
          value={newProductData?.name}
          onChange={(e) =>
            setNewProductData({ ...productData, name: e.target.value })
          }
        />
      </div>
      <div>
        Description:{" "}
        <input
          type="text"
          value={newProductData?.description}
          onChange={(e) =>
            setNewProductData({ ...productData, description: e.target.value })
          }
        />
      </div>
      <div>
        Price:{" "}
        <input
          type="text"
          value={newProductData?.price}
          onChange={(e) =>
            setNewProductData({ ...productData, price: e.target.value })
          }
        />
      </div>
      <div>
        Amount:{" "}
        <input
          type="text"
          value={newProductData?.amount}
          onChange={(e) =>
            setNewProductData({ ...productData, amount: e.target.value })
          }
        />
      </div>

      <button
        onClick={() =>
          editProduct({
            token: user?.token,
            productId: productId,
            productData: newProductData,
          })
        }
      >
        Edit
      </button>
    </main>
  );
};

export default EditProductPage;
