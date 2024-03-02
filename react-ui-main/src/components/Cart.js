import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";

const Cart = () => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="cart">
            <h2>Cart</h2>
            {products.map((product) => (
                <div key={product._id} className="cart-item">
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                    <button onClick={() => handleRemoveFromCart(product)}>Remove</button>
                </div>
            ))}
            {products.length > 0 && (
                <button onClick={handleClearCart}>Clear Cart</button>
            )}
        </div>
    );
};

export default Cart;