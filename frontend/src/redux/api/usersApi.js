import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    addItemToCart: builder.mutation({
      query: ({ token, ...productData }) => ({
        url: "/users/cart",
        method: "POST",
        body: productData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Cart"],
    }),
    getItemsNumberInCart: builder.query({
      query: (token) => ({
        url: "/users/cart/amount",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Cart"],
    }),
    getUserDetails: builder.query({
      query: (token) => ({
        url: "/users/details",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["User"],
    }),
    postGetUserProfile: builder.mutation({
      query: ({ token, ...reqUserId }) => ({
        url: "/users/profile",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { reqUserId },
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: (token) => ({
        url: "/users",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Users"],
    }),
    searchUsers: builder.query({
      query: (searchString) => ({
        url: "/users/search",
        params: { searchString },
      }),
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/user/${userId}`,
        body: userData,
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  tagTypes: ["Users", "User", "Cart"],
});

export const {
  // GET /users
  useGetUsersQuery,
  useLazyGetUsersQuery,
  // DELETE /users/:userId
  useDeleteUserMutation,
  useCreateUserMutation,
  useLazySearchUsersQuery,
  // POST /users/cart
  useAddItemToCartMutation,
  // GET /users/cart/amount
  useLazyGetItemsNumberInCartQuery,
  useGetItemsNumberInCartQuery,
  useGetUserDetailsQuery,
} = usersApi;
