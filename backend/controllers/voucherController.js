import voucherModel from "../models/voucherModel.js";
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
    const voucher = new voucherModel({
      amount: req.body.amount,
      description: req.body.description,
      selectedUsers: req.body.selectedUsers,
      createdAt: req.body.createdAt,
    });

    await voucher.save();
    res.json({ success: true, message: "Voucher Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listVoucher, addVoucher };
