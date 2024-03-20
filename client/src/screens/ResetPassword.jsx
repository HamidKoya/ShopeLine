import React, { useState } from "react";
import { useResetPasswordMutation } from "../slices/userApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== ConfirmPassword) {
      alert("Password do not match");
    } else {
      try {
        const response = await resetPassword({ resetToken, password }).unwrap();
        navigate("/");
        toast.success("Password Reset Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <div className=" bg-stone-950 bg-opacity-20 rounded-2xl w-[300px] flex flex-col gap-3 p-5">
      <h2 className="text-2xl font-light text-white ">Reset Password</h2>
      <form
        className="flex flex-col justify-center gap-3 "
        onSubmit={handleResetPasswordSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white font-thin text-xs">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-stone-50 rounded-2xl opacity-35 h-8"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white font-thin text-xs">
            Confirm Password
          </label>
          <input
            type="password"
            id="ConfirmPassword"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-stone-50 rounded-2xl opacity-35 h-8"
          />
        </div>
        <div className="flex justify-center items-center p-4">
          <button
            className="bg-white w-[60%] rounded-lg text-xs py-1"
            type="submit"
          >
            submit
          </button>
        </div>
        {isLoading && <Spinner />}
      </form>
    </div>
  );
}

export default ResetPassword;
