import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { upload } from "./uploadRoutes.js";



router.route("/").get(getProducts).post(protect,admin,upload.single("image"),createProduct)


router.route("/:id").get(getProductById).put(protect,admin,upload.single("image"),updateProduct).delete(protect,admin,deleteProduct)


export default router;
