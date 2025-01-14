import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrderWithVouchers,
  listOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/list", listOrders);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.post("/place", authMiddleware, placeOrderWithVouchers);
orderRouter.post("/status", updateStatus);

export default orderRouter;
