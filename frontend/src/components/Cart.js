import React from "react";
import { Link } from "react-router-dom";
import { useGetItemsNumberInCartQuery } from "../redux/api/usersApi";
import { useUser } from "../hooks/useUser";

const Cart = () => {
  const user = useUser();

  const { data: itemsNumber, isFetching: cartIsFetching } =
    useGetItemsNumberInCartQuery(user?.token);

  if (cartIsFetching) return <>Cart is Loading...</>;

  if (!user) return null;

  return (
    <Link to={"/order"} className="cursor-pointer fw-bold text-black">
      <i className="fa fa-cart-shopping"></i> {itemsNumber?.amount}
    </Link>
  );
};

export default Cart;
