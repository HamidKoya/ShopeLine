import React from "react";
import { useDeliverOrderMutation, useGetOrderDetailsQuery, usePayWithStripeMutation } from "../slices/orderApiSlice";
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

  const [payWithStripe, {isLoading:loadingStripe}] = usePayWithStripeMutation()
  const [deliverOrder,{isLoading:loadingDeliver}] = useDeliverOrderMutation()
  

  if(error) {
    return toast.error(error?.message)
  }
  if(isLoading){
    return <Spinner />
  }

  

  const { shippingAddress, user, isDelivered, orderItems,shippingPrice,taxPrice } = order;
  const calculateTotal = (orderItems) =>(
    orderItems.reduce((acc,item)=> acc + item.qty * item.price,0)
  )
  
  const handleStripePayment = async (orderItems) => {
    try {
      const res = await payWithStripe(orderItems).unwrap()
      window.location.href = res.url
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  const handleDeliverOrder = async (orderId) => {
     await deliverOrder(orderId)
     refetch()
  }

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
          <p>Address:{shippingAddress?.address}</p>
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
            {orderItems?.map((item) => (
              <tr key={item._id} className="border-b border-gray-400">
                <td className="text-left">{item.name}</td>
                <td className="text-right">{item.qty}</td>
                <td className="text-right">₹{(item.price * item.qty).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="border-b border-gray-400">
              <td className="text-left font-semibold">Shipping</td>
              <td className="text-right"></td>
              <td className="text-right">₹{shippingPrice}</td>
            </tr>
            <tr className="border-b border-gray-400">
              <td className="text-left font-semibold">Tax</td>
              <td className="text-right"></td>
              <td className="text-right">₹{taxPrice}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <p className="text-right font-semibold">Total:₹{+calculateTotal(orderItems).toFixed(2) + +shippingPrice + +taxPrice}</p>
        </div>
        <div className="flex justify-start items-center ">
          <button className="bg-blue-500  text-white px-4 py-2 mr-3 rounded-md" onClick={()=> handleStripePayment(orderItems)}>
            Pay with Stripe
          </button>
          {loadingStripe && <Spinner/>}
          {userInfo.isAdmin && !order.isDelivered && <button className="bg-black text-white px-4 py-2 rounded-md" onClick={()=>handleDeliverOrder(orderId)}>
            Mark as Delivered
          </button>}
        </div>
      </div>
    </div>
  );
};

export default OrdersScreen;
