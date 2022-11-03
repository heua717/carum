import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux/es/exports";
import roomInfoSlice from "./slices/room";

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

const rootReducer = combineReducers({
  roomInfo: roomInfoSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
