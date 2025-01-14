import express from "express";
import {
  addVoucher,
  listVoucher,
  removeVoucher,
} from "../controllers/voucherController.js";
import multer from "multer";
const voucherRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

voucherRouter.get("/list", listVoucher);
voucherRouter.post("/add", upload.single("image"), addVoucher);
voucherRouter.post("/remove", removeVoucher);

export default voucherRouter;
