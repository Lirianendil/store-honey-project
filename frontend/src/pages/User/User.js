import { useUser } from "../../hooks/useUser";
import { useGetUserDetailsQuery } from "../../redux/api/usersApi";
import "./User.css";

const User = () => {
  const user = useUser();

  const {
    data: userData,
    isSuccess: userIsSuccess,
    isFetching: userIsFetching,
  } = useGetUserDetailsQuery(user?.token);

  console.log("orders => ", userData?.orders);

  if (userIsFetching) return <h1>Loading user data...</h1>;

  return (
    <main className="user_profile">
      {userIsSuccess && userData ? (
        <div>
          <h1>{userData?.name} user profile</h1>
          <div>
            {userData?.orders?.map((order, index) => {
              return (
                <div key={order?._id || index} className="order_card">
                  <div>Sum: {order?.totalSum}</div>
                  <div className="order_card flex gap-2.5 flex-wrap ">
                    {order.orderProducts?.map((productItem, productIndex) => {
                      return (
                        <div
                          key={productItem?._id || productIndex}
                          className="order_product"
                        >
                          <div>Name: {productItem.product?.name}</div>
                          <div>Amount: {productItem?.amount}</div>
                          <div>Price: {productItem.product?.price}</div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Кнопка покупки */}
                  <button className="purchase_button">Buy</button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1 className="no_data">No data found</h1>
      )}
    </main>
  );
};

export default User;
