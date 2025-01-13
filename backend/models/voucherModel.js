import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const voucherModel =
  mongoose.models.voucher || mongoose.model("voucher", voucherSchema);
export default voucherModel;
