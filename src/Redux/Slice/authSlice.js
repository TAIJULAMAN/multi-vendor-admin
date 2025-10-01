import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log("authslice");
      const payload = action.payload || {};
      const user = payload.user ?? payload.data?.user ?? null;
      const token = payload.token ?? payload.data?.accessToken ?? null;

      state.user = user;
      state.token = token;
      // console.log("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;