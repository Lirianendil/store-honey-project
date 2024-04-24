import React, { useEffect, useState } from "react";
import {
  useGetItemsNumberInCartQuery,
  useGetUserDetailsQuery,
} from "../../redux/api/usersApi";
import { useUser } from "../../hooks/useUser";
import { useCreateOrderMutation } from "../../redux/api/orderApi";
import { useNavigate } from "react-router-dom";

export const Order = () => {
  const user = useUser();
  console.log("user", user?.token);
  const navigate = useNavigate();
  //TODO local storage works async.. need get user -> getToken
  const { data: userData } = useGetUserDetailsQuery(user?.token);

  const [cartProductsList, setCartProductsList] = useState(
    userData?.cart || []
  );

  useEffect(() => {
    if (userData) setCartProductsList(userData.cart);
  }, [userData]);

  const [createOrder, { data: orderData, isSuccess: orderIsSuccess }] =
    useCreateOrderMutation();

  console.log("orderIsSuccess", orderIsSuccess);

  const { refetch: refetchItemsNumber } = useGetItemsNumberInCartQuery(
    user?.token
  );

  useEffect(() => {
    if (orderIsSuccess && user?.token && orderData) {
      refetchItemsNumber();
      navigate("/profile");
    }
  }, [orderIsSuccess, navigate, user, refetchItemsNumber, orderData]);

  return (
    <main>
      <h1>New Order</h1>
      {cartProductsList?.length < 1 ? (
        <h1>No products in your cart</h1>
      ) : (
        <div className="orders_list">
          {cartProductsList?.map((cartProduct) => {
            return (
              <div key={cartProduct?.product?._id} className="order_card">
                <div>Name: {cartProduct?.product?.name}</div>
                <div>Price: {cartProduct?.product?.price}</div>
                <div>Amount: {cartProduct?.amount}</div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={() => {
          createOrder({
            orderProducts: cartProductsList.map((prod) => ({
              product: prod.product ? prod.product._id : null,
              amount: prod.amount,
            })),
            token: user?.token,
          });
        }}
      >
        Create Order
      </button>
    </main>
  );
};

export default Order;
