import React from "react";
import { useGetOrderDetailsQuery } from "../slices/orderApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {toast} from'react-toastify'
import Spinner from '../components/Spinner'

const OrdersScreen = () => {
  const {userInfo} = useSelector((state)=>state.user)
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);
  

  if(error) {
    return toast.error(error.message)
  }
  if(isLoading){
    return <Spinner />
  }

  

  const { shippingAddress, user, isDelivered, orderItems } = order;
  const calculateTotal = (orderItems) =>(
    orderItems.reduce((acc,item)=> acc + item.qty * item.price,0)
  )
  console.log(isDelivered);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start">
      <div className="md:w-2/3 p-4">
        <h2 className="text-3xl font-semibold mb-4">Order Details:</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Order Number:</h3>
          <p>{orderId}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Details:</h3>
          <p>Name:{user.name}</p>
          <p>Email:{user.email}</p>
          <p>Address:{shippingAddress.address}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Order Status:</h3>
          <p className={isDelivered? "text-green-500 font-semibold":"text-red-500 font-semibold"}>{isDelivered ? "Delivered": "Not Delivered"}</p>
        </div>
      </div>

      <div className="md:w-1/3 bg-stone-50 bg-opacity-20 p-4">
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left">Product</th>
              <th className="text-right">Quantity</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item._id} className="border-b border-gray-400">
                <th className="text-left">{item.name}</th>
                <th className="text-right">{item.qty}</th>
                <th className="text-right">{item.price}</th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <p className="text-right font-semibold">Total:{calculateTotal(orderItems).toFixed(2)}</p>
        </div>
        <div className="flex justify-start items-center ">
          <button className="bg-blue-500  text-white px-4 py-2 mr-3 rounded-md">
            Pay with Stripe
          </button>
          {userInfo.isAdmin && !order.isDelivered && <button className="bg-black text-white px-4 py-2 rounded-md">
            Mark as Delivered
          </button>}
        </div>
      </div>
    </div>
  );
};

export default OrdersScreen;
