import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useGetItemsNumberInCartQuery } from "../../redux/api/usersApi";

const Cart = () => {
  const user = useUser();
  const { data: itemsNumber, isFetching: cartIsFetching } =
    useGetItemsNumberInCartQuery(user?.token);

  if (cartIsFetching) return <>Cart is Loading...</>;

  return <Link to="/order">Items: {itemsNumber?.amount}</Link>;
};

export default Cart;
