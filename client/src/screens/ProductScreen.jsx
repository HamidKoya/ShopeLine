import React from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

const ProductScreen = () => {
    const { id } = useParams();
    const product = products.find((product) => id == product.id);
    console.log(product);
    return (
        <div className="container mx-auto mt-8 p-4 bg-orange-200">
            <Link to="/">
                <button className="bg-gray-800 px-4 py-2 rounded-md mb-4">
                    Go Back
                </button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-1">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="md:col-span-1">
                    <h1 className="text-2xl font-semibold">{product.name}</h1>
                    <p className="text-gray-700 mt-2">{product.description}</p>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-500 mr-1">{product.rating}</span>
                        <span className="text-gray-500">
                            ({product.numReviews} reviews)
                        </span>
                    </div>
                    <p className="text-gray-700 mt-2">₹{product.price.toFixed(2)}</p>
                    <p className="text-gray-700 mt-2">In Stock: {product.countInStock}</p>

                    <div className="mt-4">
                        <label htmlFor="quantity" className="text-gray-700">
                            Quantity:
                        </label>
                        <select
                            id="quantity"
                            className="bg-white border border-gray-300 p-2 rounded-md mt-2"
                        >
                            {[...Array(product.countInStock).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="bg-yellow-500 px-4 py-2 rounded-md mt-4 hover:bg-yellow-600">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;