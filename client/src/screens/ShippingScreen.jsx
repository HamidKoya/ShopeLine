import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingScreen = () => {

    
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [address,setAddress] = useState(shippingAddress.address || "")
    const [city,setCity] = useState(shippingAddress.city || "")
    const [postalCode,setpostalCode] = useState(shippingAddress.postalCode || "")
    const [country,setCountry] = useState(shippingAddress.country || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleShippingSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment')
        
    }


  return (
    <div className="bg-stone-950 bg-opacity-20 w-[300px] p-5 rounded-2xl">
      <h2 className="text-2xl font-light text-white">Shipping</h2>
      <form className="flex flex-col gap-3 p-1 text-white" onSubmit={handleShippingSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-thin text-white" htmlFor="address">Address:</label>
          <input className=" bg-stone-50 h-8 rounded-2xl bg-opacity-35"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}/> 
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-thin text-white" htmlFor="city">City:</label>
          <input className=" bg-stone-50 h-8 rounded-2xl bg-opacity-35"
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-thin text-white" htmlFor="postaCode">Postal Code:</label>
          <input className=" bg-stone-50 h-8 rounded-2xl bg-opacity-35"
            type="text"
            id="postaCode"
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-thin text-white" htmlFor="country">Country:</label>
          <input className=" bg-stone-50 h-8 rounded-2xl bg-opacity-35"
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div className="flex justify-center items-center">
        <button  type="submit"  className=" bg-white text-black py-1 px-2 rounded-lg">Continue to Payment</button>
        </div>
      </form>
    </div>
  );
};

export default ShippingScreen;
