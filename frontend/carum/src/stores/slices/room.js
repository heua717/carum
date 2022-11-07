import { createSlice } from "@reduxjs/toolkit";

const roomInfoSlice = createSlice({
  name: "roomReducer",
  initialState: {
    nowRoomId: null,
  },
  reducers: {
    setNowRoomId: (state, action) => {
      state.nowRoomId = action.payload;
    },
  },
});

export const { setNowRoomId } = roomInfoSlice.actions;

export default roomInfoSlice;
