import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Product = ({ product }) => {
  
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-red-300 p-4 shadow-md  rounded-md relative cursor-pointer h-[320px]">
       
       <button className="  absolute bottom-5 hover:p-2 p-2 rounded-full bg-slate-700 right-10">
    <FaHeart className="text-xl text-white"/>
       </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain mb-2"
        />
        <div className="text-lg font-semibold overflow-hidden w-full h-7  ">
          {product.name?product.name:"no name"}
        </div>
        <div className="flex items-center mt-1">
          <span className="text-yellow-500 mr-1">{product.rating}</span>
          <span className="text-gray-500">({product.numReviews} reviews)</span>
        </div>
        <p className="mt-2 text-gray-700">₹{product.price.toFixed(2)}</p>

      </div>
    </Link>
  );
};

export default Product;
