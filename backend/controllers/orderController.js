import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Config variables
const deliveryCharge = 5;

// Place order using vouchers
const placeOrderWithVouchers = async (req, res) => {
  const { userId, items, amount, address } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const totalAmount = amount + deliveryCharge;

    if (user.vouchers < totalAmount) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient voucher balance" });
    }

    user.vouchers -= totalAmount;
    await user.save();

    const newOrder = new orderModel({
      userId,
      items,
      amount: totalAmount,
      address,
      payment: true,
      status: "pending", // Default status
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

// List all orders for the admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).select("-__v");
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// List user-specific orders
const userOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await orderModel.find({ userId }).select("-__v");
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user orders" });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    // Update status and closedAt fields
    const updateFields = { status };
    if (status === "approved" || status === "rejected") {
      updateFields.closedAt = new Date(); // Set closedAt to the current timestamp
    } else if (status === "pending") {
      updateFields.closedAt = null; // Reset closedAt for pending status
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      updateFields,
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

export { placeOrderWithVouchers, listOrders, userOrders, updateStatus };
