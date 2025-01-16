import express from "express";
import {
  loginUser,
  registerUser,
  getAllUsers,
  getUsersByIds,
  toggleUserStatus,
  deleteUser,
  addUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser); // Registration route (public)
userRouter.post("/login", loginUser); // Login route (public)


// Admin-only routes
userRouter.get("/all", getAllUsers); // Admin: Get all users
userRouter.post("/spec", getUsersByIds); // Admin: Get all users
userRouter.post("/", addUser); // Admin: Add new user
userRouter.put("/toggle-status/:id", toggleUserStatus); // Admin: Update user by ID
userRouter.delete("/:id", deleteUser); // Admin: Delete user by ID

export default userRouter;
