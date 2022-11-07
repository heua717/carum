import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shopReducer",
  initialState: {
    shopFurnitureList: null,
    inventoryList: null,
  },
  reducers: {
    setShopFurnitureList: (state, action) => {
      state.shopFurnitureList = action.payload;
    },
    setInventoryList: (state, action) => {
      state.inventoryList = action.payload;
    },
  },
});

export const { setShopFurnitureList, setInventoryList } = shopSlice.actions;

export default shopSlice;
