export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  state.taxPrice = addDecimals((state.itemsPrice * 0.15).toFixed(2));
  state.totalPrice = (
    +state.itemsPrice +
    +state.shippingPrice +
    +state.taxPrice
  ).toFixed(2);

  // Update localStorage with only cartItems
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
