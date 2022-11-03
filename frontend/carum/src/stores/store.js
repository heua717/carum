import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux/es/exports";

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();
