import { createSlice } from "@reduxjs/toolkit";
import {updateCart} from "../utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItemIndex = state.cartItems.findIndex(
        (i) => i._id === item._id
      );

      if (existItemIndex !== -1) {
        // If item exists, update it
        state.cartItems[existItemIndex] = item;
      } else {
        // If item doesn't exist, add it to the cart
        state.cartItems.push(item);
      }
      return updateCart(state)
    }, 
    removeItemFromCart: (state,action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((i)=> i._id !== itemId)
      return updateCart(state)
    }
  },
});
export const { addToCart,removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
