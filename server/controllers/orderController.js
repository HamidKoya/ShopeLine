import Order from "../models/orderModel.js"
import asyncHandler from 'express-async-handler'

const addOrderItems = asyncHandler(async(req,res)=> {
const {orderItems,shippingAddress,paymentMethod,itemsPrice,shippingPrice,totalPrice,taxPrice} = req.body

if(orderItems?.length = 0){
    res.status(400)
    throw new Error("No order Items")
}else{
const order = new Order({
    orderItems: orderItems.map(item => ({
        ...item,product:product._id
    })),
    user:req.user._id

})
}




})

export {addOrderItems}