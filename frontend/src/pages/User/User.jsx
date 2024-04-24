import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import {
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
} from "../../redux/api/usersApi";
import "./User.css";

const User = () => {
  const user = useUser();

  console.log("USER ======> ", user);

  const [userData, setUserData] = useState(null);

  const [
    loadDetails,
    { data: userDetails, isSuccess: userIsSuccess, isFetching: userIsFetching },
  ] = useLazyGetUserDetailsQuery();

  useEffect(() => {
    if (user && user?.token) loadDetails(user?.token);
  }, [user]);

  useEffect(() => {
    if (user && userDetails) {
      setUserData(userDetails);
    }
  }, [user, userDetails, userIsSuccess]);

  console.log("orders => ", userData?.orders);

  if (userIsFetching) return <h1>Loading user data...</h1>;

  return (
      <main className="user_profile">
        {userIsSuccess && userData ? (
            <div>
              <h1>{userData?.name} user profile</h1>
              <div>
                {userData?.orders?.map((order, index) => (
                    <div key={order?._id || index} className="order_card">
                      <div>Sum: {order?.totalSum}</div>
                      <div className="order_card flex gap-2.5 flex-wrap">
                        {order.orderProducts?.map((productItem, productIndex) => (
                            <div
                                key={productItem?._id || productIndex}
                                className="order_product"
                            >
                              <img
                                  src={`http://localhost:8080/${productItem.product?.image}`}
                                  alt={productItem.product?.name}
                                  style={{ width: '100px', height: '100px' }}
                              />
                              <div>Name: {productItem.product?.name}</div>
                              <div>Amount: {productItem?.amount}</div>
                              <div>Price: {productItem.product?.price}</div>
                            </div>
                        ))}
                      </div>
                      <button className="purchase_button">Buy</button>
                    </div>
                ))}
              </div>
            </div>
        ) : (
            <h1 className="no_data">No data found</h1>
        )}
      </main>
  );
};

export default User;
