import React from "react";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return toast.error(error.data?.message || error.message)
  }

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-stone-50 bg-opacity-20">
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">ID</th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">User</th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">Date</th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">Total</th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">Delivered</th>
              <th className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">{order._id}</td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">{order.user?.name}</td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">{order.createdAt?.slice(0, 10)}</td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">₹{order.totalPrice}</td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8">{order.isDelivered ? "YES" : "NO"}</td>
                <td className="border border-gray-300 py-2 px-4 sm:px-6 md:px-8"> <Link to={`/orders/${order._id}`}><button className="bg-blue-500 hover:bg-blue-700">
                  View Details
                </button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )

};

export default OrderListScreen;
