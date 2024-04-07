import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.products.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.products = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;