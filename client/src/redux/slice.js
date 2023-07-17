import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    reqLogin: (state, action) => {
      state.data = action.payload;
    },
    reqLogout: (state, action) => {
      state.data = {};
    },
  },
});

export default userSlice.reducer;
export const { reqLogin, reqLogout } = userSlice.actions;
