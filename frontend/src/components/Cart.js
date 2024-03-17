import React from "react";
import { Link } from "react-router-dom";
import { useGetItemsNumberInCartQuery } from "../redux/api/usersApi";
import { useUser } from "../hooks/useUser";

const Cart = () => {
    const user = useUser();

    const { data: itemsNumber, isFetching: cartIsFetching } =
        useGetItemsNumberInCartQuery(user?.token, { skip: user ? false : true });

    console.log(itemsNumber);

    if (cartIsFetching) return <>Cart is Loading...</>;

    if (!user) return null;

    return (
        <Link
            to={"/order"}
            className=" cursor-pointer  fa fa-cart-shopping fw-bold text-black"
        >
            Items: {itemsNumber?.amount}
        </Link>
    );
};

export default Cart;






















// import React from "react";
// import { Link } from "react-router-dom";
// import { useGetItemsNumberInCartQuery } from "../redux/api/usersApi";
// import { useUser } from "../hooks/useUser";
//
// const Cart = () => {
//   const user = useUser();
//
//   const { data: itemsNumber, isFetching: cartIsFetching } =
//     useGetItemsNumberInCartQuery(user?.token);
//
//   console.log(itemsNumber);
//
//   if (cartIsFetching) return <>Cart is Loading...</>;
//
//   if (!user) return null;
//
//   return (
//     <Link
//       to={"/order"}
//       className=" cursor-pointer  fa fa-cart-shopping fw-bold text-black"
//     >
//       Items: {itemsNumber?.amount}
//     </Link>
//   );
// };
//
// export default Cart;
