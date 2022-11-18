import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux/es/exports";
import roomInfoSlice from "./slices/room";
import shopSlice from "./slices/shop";
import userSlice from "./slices/user";
import pageSlice from "./slices/page";

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

const rootReducer = combineReducers({
  roomInfo: roomInfoSlice.reducer,
  shop: shopSlice.reducer,
  user: userSlice.reducer,
  page: pageSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
