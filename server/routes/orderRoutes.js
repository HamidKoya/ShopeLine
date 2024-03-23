import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, getUserOrders } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'


router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect,getOrderById)
router.route("/user-orders").get(protect,getUserOrders)

export default router

