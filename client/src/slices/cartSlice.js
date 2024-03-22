import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "" };

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
      return updateCart(state);
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((i) => i._id !== itemId);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod:(state,action) => {
      state.paymentMethod = action.payload
      localStorage.setItem('cart',JSON.stringify(state))
    },
    clearCartItems: (state) => {
      state.cartItems = []
      localStorage.setItem('cart',JSON.stringify(state))
    }
  },
});
export const { addToCart, removeItemFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
