import express from 'express';
import {
  loginUser,
  registerUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addUser,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', registerUser); // Registration route (public)
userRouter.post('/login', loginUser); // Login route (public)

// Admin-only routes
userRouter.get('/all', authMiddleware, isAdmin, getAllUsers); // Admin: Get all users
userRouter.post('/', authMiddleware, isAdmin, addUser); // Admin: Add new user
userRouter.put('/:id', authMiddleware, isAdmin, updateUser); // Admin: Update user by ID
userRouter.delete('/:id', authMiddleware, isAdmin, deleteUser); // Admin: Delete user by ID

export default userRouter;