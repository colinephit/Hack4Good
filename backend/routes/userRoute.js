import express from 'express';
import {
    loginUser,
    registerUser,
    getAllUsers,
    updateUser,
    deleteUser,
    addUser
} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js'; // Import auth middleware
import isAdmin from '../middleware/isAdmin.js';     // Import admin role-check middleware

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser); // Register user
userRouter.post("/login", loginUser);       // Login user

// Admin-only routes
userRouter.get("/all", authMiddleware, isAdmin, getAllUsers); // Admin: Get all users
userRouter.post("/", authMiddleware, isAdmin, addUser);       // Admin: Add new user
userRouter.put("/:id", authMiddleware, isAdmin, updateUser);  // Admin: Update user by ID
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser); // Admin: Delete user by ID

export default userRouter;