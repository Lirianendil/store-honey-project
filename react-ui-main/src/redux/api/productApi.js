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
    }),
});

export const { useCreateProductMutation, useGetProductsQuery } = productApi;