import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../redux/api/usersApi";
import { authApi } from "../redux/api/authApi";
import authReducer from "../redux/slices/authSlice";
import { productApi } from "../redux/api/productApi";
import { orderApi } from "../redux/api/orderApi";

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      usersApi.middleware,
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,
    ]);
  },
});

export default store;
