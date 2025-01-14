import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  payment: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending", // Default status is "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current timestamp
  },
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
