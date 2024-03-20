import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/userSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";


const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== ConfirmPassword) {
      alert("Password do not match");
    } else {
      try {
        const response = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...response }));
        navigate('/')
        toast.success('Register Successful')
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <div className="bg-stone-950 bg-opacity-20 w-[300px] p-3 rounded-2xl">
      <h2 className="text-2xl font-light text-white py-1">Register</h2>
      <form className="flex flex-col gap-3" onSubmit={handleRegisterSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-thin text-white" htmlFor="name">
            Name
          </label>
          <input
            className="bg-stone-50 bg-opacity-35 rounded-2xl h-8"
            type="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-thin text-white" htmlFor="email">
            Email
          </label>
          <input
            className="bg-stone-50 bg-opacity-35 rounded-2xl h-8"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-thin text-white" htmlFor="password">
            Password
          </label>
          <input
            className="bg-stone-50 bg-opacity-35 rounded-2xl h-8"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-thin text-white" htmlFor="password">
            Confirm Password
          </label>
          <input
            className="bg-stone-50 bg-opacity-35 rounded-2xl h-8"
            type="password"
            id="Confirmpassword"
            value={ConfirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 p-4 w-full justify-center items-center text-xs">
          <button className="py-1 bg-white w-[60%] rounded-lg" type="submit">
            Register
          </button>
          <button className="flex justify-center items-center gap-1 py-1 px-2">Sign up with<FcGoogle className="text-xl"/> </button>
        </div> 
        {isLoading && <Spinner />}
      </form>
      <p className=" text-xs text-stone-200">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
