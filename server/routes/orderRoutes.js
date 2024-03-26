import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/user-orders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/deliver/:id").patch(protect,admin,updateOrderToDelivered)

export default router;
