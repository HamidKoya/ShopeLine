import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlePaymentMethod = () => {
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/place-order')
    
    }

  return (
    <div className=" bg-stone-950  rounded-2xl bg-opacity-20 w-[300px] flex flex-col gap-3 p-5">
      <h2 className="text-2xl font-light text-white">Payment Method</h2>
      <div className="flex flex-col">
        <label htmlFor="" className="mb-2">Select Payment</label>
        <label className="inline-flex items-center gap-1">
          <input type="radio" value="Stripe or Credit card" checked = {paymentMethod === "Stripe or Credit card"} onChange={e => setPaymentMethod(e.target.value)} className="form-radio h-5 w-5 text-blue-600" />
          <span>Stripe or Credit Card</span>
        </label>
      </div>
      <button className="bg-blue-600 rounded-lg flex justify-center items-center font-light w-40 py-1" onClick={handlePaymentMethod}>Continue</button>
    </div>
  );
};

export default PaymentScreen;
