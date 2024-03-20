import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const totalItems = cartItems.reduce((acc,item)=> acc + +item.qty,0)

  const handleDeleteItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkOutHandler = ()=>{
    navigate("/login?redirect=/shipping")
    
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 w-[80%] h-[550px] justify-center items-start ">
      <div className="md:w-3/4 p-4  h-full overflow-y-scroll">
        <h2 className="text-2xl  mb-4 font-thin">Shopping Cart</h2>
        {cartItems.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                className="border rounded-3xl border-gray-300 p-4 flex items-center"
                key={item._id}
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mr-4 object-contain"
                  />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Quantity:{item.qty}</p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      handleDeleteItem(item._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xl">Your cart is empty</p>
        )}
      </div>

      {cartItems.length !== 0 && 
      <div className="md:w-[30%] mt-16 p-4 text-md bg-stone-950 bg-opacity-15 rounded-lg text-white">
        <h2 className="text-xl font-light ">Subtotal</h2>
        <p className="text-stone-50">Total Items:{totalItems}</p>
        <p className="text-stone-50">Items Price:{itemsPrice}</p>
        <p className="text-stone-50">Tax:{taxPrice}</p>
        <p className="text-stone-50">Shipping Price:{shippingPrice}</p>
        <p className="text-stone-50">Total Price:{totalPrice}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600" onClick={checkOutHandler} disabled={cartItems.length===0}>
            Proceed to Checkout
        </button>
      </div>}
    </div>
  );
};

export default CartScreen;
