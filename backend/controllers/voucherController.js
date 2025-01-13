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

// add food
const addVoucher = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;

    const voucher = new voucherModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await voucher.save();
    res.json({ success: true, message: "Voucher Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// delete food
const removeVoucher = async (req, res) => {
  try {
    const voucher = await voucherModel.findById(req.body.id);
    fs.unlink(`uploads/${voucher.image}`, () => {});

    await voucherModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Voucher Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listVoucher, addVoucher, removeVoucher };
