import express from "express";
import UserController from "../Controller/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
//  Login user
router.post("/user/login", UserController.login);

//  Logout user
router.post("/user/logout", auth, UserController.logout);

//  Update user profile
router.put("/user/profile", auth, UserController.updateProfile);

//  Change password
router.post("/user/change-password", auth, UserController.changePassword);

export default router;