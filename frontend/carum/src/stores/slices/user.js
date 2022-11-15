import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    userInfo: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice;
