import { useState } from "react";
import { useAddItemToCartMutation } from "../../redux/api/usersApi";
import { useUser } from "../../hooks/useUser";
import "./Product.css";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../redux/api/productApi";
import cart from "../../assets/cart.svg";

const Product = ({ product, isAdmin }) => {
  const [count, setCount] = useState(0);
  const user = useUser();
  const [addToCart] = useAddItemToCartMutation();
  const [deleteProduct] = useDeleteProductMutation();
  return (
    <div className="product_card cursor-pointer">
      <div className="product-img-wrapper">
        <img
          src={"http://localhost:8080/" + product.image}
          alt=""
          width={150}
          height={150}
          className="product-img"
        />
      </div>
      <div className="product-title">
        <div>{product.name}</div>
        <div>{product.price} ₸</div>
      </div>
      <div className="product-desc">{product.description}</div>
      {/* <div>Amount: {product.amount}</div> */}
      {!isAdmin ? (
        <div className="product_counter">
          <div className="count_btns">
            <button
              className="count-btn min"
              onClick={() => setCount(count - 1)}
              disabled={count === 0 ? true : false}
            >
              -
            </button>
            <span className="count-num">{count}</span>

            <button
              onClick={() => setCount(count + 1)}
              className="count-btn plus"
            >
              +
            </button>
          </div>
          <button
            className="cart-btn"
            disabled={count < 1}
            onClick={() =>
              addToCart({
                productId: product._id,
                amount: count,
                token: user?.token,
              })
            }
          >
            <img src={cart} alt="" className="cart-icon" />
          </button>
        </div>
      ) : (
        <div className="product-controls">
          <Link
            className="primary-btn"
            to={`/admin/products/edit/${product._id}`}
          >
            Edit
          </Link>
          <button
            className="delete-btn"
            onClick={() =>
              deleteProduct({ token: user?.token, productId: product._id })
            }
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
