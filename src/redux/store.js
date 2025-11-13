import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice"; 

const store = configureStore({
  reducer: {
    filters: filterReducer,
    cart: cartReducer,
    product: productReducer, 
  },
});

export default store;