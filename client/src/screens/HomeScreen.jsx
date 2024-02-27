import React, { useEffect, useState } from "react";
import { products } from "../data/products";
import Product from "../components/Product";
import axios from 'axios'

const HomeScreen = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products");
      console.log(res);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-cyan-400">
      {products.map((product, i) => (
        <Product key={i} product={product} />
      ))}
    </div>
  );
};

export default HomeScreen;
