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
    },
    registerUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
    adminUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { loginUser, registerUser, logoutUser, adminUser } =
  authSlice.actions;
export default authSlice.reducer;
