import { useState } from "react";
import { useAddItemToCartMutation } from "../../redux/api/usersApi";
import { useUser } from "../../hooks/useUser";
import "./Product.css";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../redux/api/productApi";

const Product = ({ product, isAdmin }) => {
  const [count, setCount] = useState(0);
  const user = useUser();
  const [addToCart] = useAddItemToCartMutation();
  const [deleteProduct] = useDeleteProductMutation();
  return (
    <div className="listProduct">
      <div className="product_card cursor-pointer">
        <img
          src={"http://localhost:8080/" + product.image}
          alt=""
          width={150}
          height={150}
        />
        <h2>
          <br />
          <div>Name: {product.name}</div>
          <div>Description: {product.description}</div>
          <div>Amount: {product.amount}</div>
          <br />
          <p>Price: {product.price}</p>
        </h2>
        {!isAdmin ? (
          <div className="product_counter">
            <div className="count_btns">
              <button
                className="counter_btn"
                onClick={() => setCount(count - 1)}
                disabled={count === 0 ? true : false}
              >
                -
              </button>
              <h2>{count}</h2>

              <button
                className="counter_btn"
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
            </div>
            <button
              className="add_to_cart_btn"
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
    </div>
  );
};

export default Product;
