import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";


const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  console.log("dat-----------")
  res.json(products);
});
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product no found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: "sampleName",
      price: 0,
      user: req.user._id,
      image: req.file?.filename||" ",
      brand: "Sample Brand",
      category: "sample Category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  
  const product = await Product.findById(req.params.id)
  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.json({ message: "Product Deleted" })

  } else {
    res.status(404)
    throw new Error("Product not Found")
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.user = req.user._id
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.description = description

    const updatedProduct = await product.save()
    res.json(updatedProduct)

  } else {
    res.status(404)
    throw new Error("Product not Found")
  }
})





export { getProducts, getProductById, createProduct, deleteProduct, updateProduct };
