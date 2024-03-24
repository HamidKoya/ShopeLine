import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/userSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userInfo} = useSelector(state => state.user)
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || "/"

  useEffect(()=> {
    if(userInfo) {
      navigate(redirect)
    }
  },[navigate,redirect,userInfo])


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isLoadingPassword }] =
    useForgotPasswordMutation();

    
    

 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your Email");
    } else {
      try {
        const response = await forgotPassword({ email })
        toast.success(response?.data?.message);
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <div className=" bg-stone-950  rounded-2xl bg-opacity-20 w-[300px] flex flex-col gap-3 p-3">
      <h2 className="text-2xl font-light  text-white">Login</h2>
      <form className="  flex flex-col gap-3" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1">
          <label className="font-thin text-xs text-white" htmlFor="">
            Email
          </label>
          <input
            className=" bg-stone-50 h-8 rounded-2xl bg-opacity-35"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-thin text-xs text-white" htmlFor="">
            Password
          </label>
          <input
            className=" bg-stone-50 h-8 rounded-2xl bg-opacity-35"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            
            }}
          />
        </div>

        <p className=" text-xs text-stone-200">
          Forgot Password?{" "}
          <button className="text-blue-800" onClick={handleForgotPassword}>
            Click here
          </button>
        </p>
        {isLoading && <Spinner/>}
        <div className="flex flex-col gap-2 p-4  w-full justify-center items-center text-xs">
          <button
            className="py-1 w-[60%] bg-stone-50 rounded-lg"
            type="submit"
            disabled={isLoading}
          >
            Login
          </button>
          <button className="px-2 text-white py-1 flex items-center gap-2  rounded-lg">
            Sign in with <FcGoogle className="text-xl" />
          </button>
        </div>
        {isLoading && <Spinner />}
      </form>
      <p className=" text-xs text-stone-200">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginScreen;
