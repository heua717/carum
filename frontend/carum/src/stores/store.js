import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux/es/exports";
import roomInfoSlice from "./slices/room";
import shopSlice from "./slices/shop";

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

const rootReducer = combineReducers({
  roomInfo: roomInfoSlice.reducer,
  shop: shopSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
