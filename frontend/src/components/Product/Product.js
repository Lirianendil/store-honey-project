import { useState } from "react";
import { useAddItemToCartMutation } from "../../redux/api/usersApi";
import { useUser } from "../../hooks/useUser";

import "./Product.css";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../redux/api/productApi";

const Product = ({ product, isAdmin }) => {
  const [count, setCount] = useState(0);
  const user = useUser();
  console.log(user);
  const [addToCart] = useAddItemToCartMutation();
  const [deleteProduct] = useDeleteProductMutation();
  return (
    <div className="product_card">
      <div>Name: {product.name}</div>
      <p>Price: {product.price}</p>
      {!isAdmin ? (
        <div className="product_counter">
          <div className="count_btns">
            <button
              onClick={() => setCount(count - 1)}
              disabled={count === 0 ? true : false}
            >
              -1
            </button>
            <h2>{count}</h2>

            <button onClick={() => setCount(count + 1)}>+1</button>
          </div>
          <button
            onClick={() =>
              addToCart({
                productId: product._id,
                amount: count,
                token: user?.token,
              })
            }
          >
            Add to cart
          </button>
          {/* <button>Wishlist</button> */}
        </div>
      ) : (
        <>
          <Link
            className="primary-btn"
            to={`/admin/products/edit/${product._id}`}
          >
            Edit
          </Link>
          <button
            onClick={() =>
              deleteProduct({ token: user?.token, productId: product._id })
            }
          >
            Delete product
          </button>
        </>
      )}
    </div>
  );
};

export default Product;
