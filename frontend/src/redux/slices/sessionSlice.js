import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading: setLoadingReducer } = sessionSlice.actions;
export default sessionSlice.reducer;
