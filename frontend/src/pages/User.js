import { useUser } from "../hooks/useUser";
import { useGetUserDetailsQuery } from "../redux/api/usersApi";

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
    <main>
      {userIsSuccess && userData ? (
        <div>
          <h1>{userData.name} user profile</h1>
          <div>
            {userData.orders?.map((order) => {
              return (
                <div key={order._id}>
                  <div>Sum: {order.totalSum}</div>
                  <div className="flex gap-2.5 flex-wrap ">
                    {order.orderProducts?.map((productItem) => {
                      return (
                        <div
                          key={productItem._id}
                          className="bg-gray-500 py-1.5 px-2.5 w-fit rounded-md text-xs"
                        >
                          <div>Name: {productItem.product.name}</div>
                          <div>Amount: {productItem.amount}</div>
                          <div>Price: {productItem.product.price}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>No data found</h1>
      )}
    </main>
  );
};

export default User;
