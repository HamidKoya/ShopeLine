import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
  } = req.body;

  if (orderItems?.length == 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {

    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),

      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      taxPrice,

    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req,res)=>{
  const order = await Order.findById(req.params.id).populate("user", "name email")
  if(order){
    res.status(200).json(order)
  }else{
    res.status(404)
    throw new Error("Order not found")
  }
})

const getUserOrders = asyncHandler(async (req,res) => {
  const orders = await Order.find({user:req.user._id}).populate("user", "name email")
  res.status(200).json(orders)
})
export { addOrderItems,getOrderById,getUserOrders };
