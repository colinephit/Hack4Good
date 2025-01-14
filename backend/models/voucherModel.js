import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  selectedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

const voucherModel =
  mongoose.models.voucher || mongoose.model("voucher", voucherSchema);

export default voucherModel;
