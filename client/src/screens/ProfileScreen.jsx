import React, { useState } from "react";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/userSlice";
import Spinner from "../components/Spinner";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";


const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassowrd] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const {data:userOrders,isLoading,error} = useGetUserOrdersQuery()
  const [updateProfile, { isLoading:isUpdating}] = useUpdateProfileMutation();
  console.log(userOrders);
  
  

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      return alert("password do not match");
    }

    const response = await updateProfile({
      _id: userInfo._id,
      name,
      email,
      password,
    }).unwrap();
    dispatch(setCredentials({ ...response }));
    console.log(response);
    toast.success("Profile Updated Successfully");
  };

    if (error) {
      return toast.error(error.data.message || error.message);
    }

    if(isLoading){
      return <Spinner/>
    }


    

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h1 className="text-xl font-semibold mb-4">Profile</h1>
        <form className="mb-6" onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              value={name}
              className="border p-2 rounded-md w-full"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="border p-2 rounded-md w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="border p-2 rounded-md w-full"
              onChange={(e) => setPassowrd(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              className="border p-2 rounded-md w-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 p-2 text-white rounded-md"
          >
            Update Profile
          </button>
          {isUpdating && <Spinner />}
        </form>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">OrderID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Delivered</th>
            </tr>
          </thead>
          <tbody>
            {userOrders?.map((order)=>(
              <tr key={order._id}>
                <td className="border p-2">{order._id}</td>
                <td className="border p-2">{order.createdAt?.slice(0, 10)}</td>
                <td className="border p-2">{order.totalPrice}</td>
                <td className={"border p-2 " + (order.isDelivered ? "text-green-500" : "text-red-500")}>{order.isDelivered ? "YES" : "NO" }</td>
              </tr>
            ))}
          </tbody>
        </table>
        {userOrders.length === 0 && <p className='text-gray-400 text-xl text-center mt-5'>No Orders</p>}
      </div>
    </div>
  );
};

export default ProfileScreen;
