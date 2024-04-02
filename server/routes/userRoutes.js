import express from 'express';
const  router = express.Router()

import { deleteUser, forgotPassword, getUserById, getUsers, loginUser,logoutUser,registerUser, resetPassword, updateUser, updateUserProfile } from '../controllers/userController.js';
import { admin, protect } from "../middleware/authMiddleware.js";
router.route("/").get(protect,admin,getUsers)
router.route("/:id").put(protect,admin,updateUser).get(protect,admin,getUserById).delete(protect,admin,deleteUser)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/update').put(updateUserProfile)
router.route('/logout').get(logoutUser)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:resetToken').patch(resetPassword)

export default router