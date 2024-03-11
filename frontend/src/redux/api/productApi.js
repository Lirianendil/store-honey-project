import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        headers: {
          Authorization: `Bearer ${body.get("token")}`,
        },
        body: body,
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
    }),
    searchProducts: builder.query({
      query: (searchString) => ({
        url: "/products/search",
        params: { searchString },
      }),
    }),
    editProduct: builder.mutation({
      query: ({ token, productId, productData }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ token, productId }) => ({
        url: `/products/${productId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    getProductDetails: builder.query({
      query: ({ token, productId }) => ({
        url: `/products/${productId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useDeleteProductMutation,
  useGetProductDetailsQuery,
  useEditProductMutation,
} = productApi;
