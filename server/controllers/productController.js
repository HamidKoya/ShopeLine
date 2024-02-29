import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({})
    res.json(products)
})
const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    res.json(product)
})

export {getProducts,getProductById}