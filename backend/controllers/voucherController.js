import voucherModel from "../models/voucherModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

// all food list
const listVoucher = async (req, res) => {
  try {
    const vouchers = await voucherModel.find({});
    res.json({ success: true, data: vouchers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// add voucher
const addVoucher = async (req, res) => {
  try {
    const { amount, description, selectedUsers, createdAt } = req.body;

    const voucher = new voucherModel({
      amount: req.body.amount,
      description: req.body.description,
      selectedUsers: req.body.selectedUsers,
      createdAt: req.body.createdAt,
    });

    await voucher.save();

    if (selectedUsers && selectedUsers.length > 0) {
      await userModel.updateMany(
        { _id: { $in: selectedUsers } },
        { $inc: { amount } } // Increment the user's amount by the voucher's amount
      );
    }

    res.json({ success: true, message: "Voucher Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listVoucher, addVoucher };
