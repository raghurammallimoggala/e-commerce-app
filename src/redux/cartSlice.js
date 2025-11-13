import { createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartList: storedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartList.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartList.push(action.payload);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartList));
    },

    removeFromCart: (state, action) => {
      state.cartList = state.cartList.filter(item => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartList));
    },

    incrementQuantity: (state, action) => {
      const item = state.cartList.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;

        state.cartList = [...state.cartList];
        localStorage.setItem("cartItems", JSON.stringify(state.cartList));
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cartList.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
         
      }else {
      state.cartList = state.cartList.filter(i => i.id !== action.payload);
      }
       state.cartList = [...state.cartList];
       localStorage.setItem("cartItems", JSON.stringify(state.cartList));
    },

    clearCart: (state) => {
      state.cartList = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;