import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : {cartSlice:[]}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{}
})

console.log(cartSlice);
    
export default cartSlice.reducer
