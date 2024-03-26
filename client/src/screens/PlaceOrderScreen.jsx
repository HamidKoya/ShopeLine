import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";

const PlaceOrderScreen = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const {
    cartItems,
    shippingAddress: {
      address,
      city,
      postalCode,
      country,
      itemsPrice,
      shippingPrice,
      taxPrice,
    },
    paymentMethod,
    totalPrice,
  } = cart;

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
          itemsPrice,
          shippingPrice,
          taxPrice,
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      console.log(res);
      toast.success("Order Placed!");
      dispatch(clearCartItems());
      
      navigate(`/order/${res._id}`);

    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-between p-7 gap-5">
      <div className="bg-stone-50 bg-opacity-20 flex flex-col p-4 md:w-1/5">
        <h2 className="text-2xl font-semibold">Place Order</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Shipping address</h3>
          <p>
            {address},{city},{postalCode},{country}
          </p>
        </div>
        <h3 className="text-lg font-semibold mb-2">{paymentMethod}</h3>
        <p className="text- font-extralight">Stripe</p>
      </div>

      <div className="bg-stone-50 bg-opacity-20 p-4 md:w-1/3">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left">Product</th>
              <th className="text-right">Quantity</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id} className="border-b border-gray-400">
                <td className="text-left">{item.name}</td>
                <td className="text-right">{item.qty}</td>
                <td className="text-right">
                ₹{(item.price * item.qty).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <p className="text-right font-semibold">Total:₹{totalPrice}</p>
        </div>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded w-full mt-4"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        {isLoading && <Spinner />}
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
