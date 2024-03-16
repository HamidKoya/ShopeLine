import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/userSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      console.log(response);
      dispatch(setCredentials({ ...response }));
      navigate("/");
      toast.success("Login Successful");
      console.log(response);
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
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
              console.log(password);
            }}
          />
        </div>

        <p className=" text-xs text-stone-200">
          Forgot Password? <button className="text-blue-800">Click here</button>
        </p>
        <div className="flex flex-col gap-2 p-4  w-full justify-center items-center text-xs">
          <button
            className="px- py-1 w-[60%] bg-stone-50 rounded-lg"
            type="submit"
            disabled={isLoading}
          >
            Login
          </button>
          <button className="px-2 text-white py-1 flex items-center gap-2  rounded-lg">
            <FcGoogle className="text-xl" />
            Sign in with Google{" "}
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
