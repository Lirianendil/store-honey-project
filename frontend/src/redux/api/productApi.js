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
      invalidatesTags: ["Products"],
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
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      providesTags: ["Products"],
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
    searchProducts: builder.query({
      query: ({ searchString, page, limit }) => ({
        url: "/products/search",
        params: { searchString, page, limit },
      }),
    }),
    // Existing endpoints...

    // New endpoint for uploading a product photo
    uploadProductPhoto: builder.mutation({
      query: (formData) => {
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        return {
          url: `/products/upload-photo/${formData.get('productId')}`,
          method: "POST",
          headers,
          body: formData.get(),
        };
      },
    }),
  }),
  tagTypes: ["Products", "Product"],
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useDeleteProductMutation,
  useGetProductDetailsQuery,
  useEditProductMutation,
  useUploadProductPhotoMutation,
} = productApi;
