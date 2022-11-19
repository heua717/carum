import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "pageReducer",
  initialState: {
    curPage: null,
  },
  reducers: {
    setCurPage: (state, action) => {
      state.curPage = action.payload;
    },
  },
});

export const { setCurPage } = pageSlice.actions;

export default pageSlice;
