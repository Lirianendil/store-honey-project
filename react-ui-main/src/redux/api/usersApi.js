import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: (builder) => ({
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
    tagTypes: ["Users"],
});

export const {
    // GET /users
    useGetUsersQuery,
    useLazyGetUsersQuery,
    // DELETE /users/:userId
    useDeleteUserMutation,
    useCreateUserMutation,
    useLazySearchUsersQuery,
} = usersApi;