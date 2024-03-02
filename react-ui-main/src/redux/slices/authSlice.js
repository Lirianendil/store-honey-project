
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
            console.log(action.payload)
        },
        registerUser: (state, action) => {
            // Используйте Immer, чтобы изменить состояние
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            // Используйте Immer, чтобы изменить состояние
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { loginUser, registerUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
