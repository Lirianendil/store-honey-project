import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ token, ...orderData }) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOrders: builder.query({
      query: ({ token, ...orderData }) => ({
        url: "/orders",
        method: "GET",
        body: orderData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;
