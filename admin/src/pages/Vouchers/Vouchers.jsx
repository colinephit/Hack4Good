import React from "react";
import Menu from "../../components/Menu/Menu";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddVoucher from "../AddVoucher/AddVoucher";
import VoucherList from "../VoucherList/VoucherList";
import "./Vouchers.css";

const Vouchers = () => {
  return (
    <div className="inside">
      <ToastContainer />
      <div className="app-content">
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate to="voucherlist" />} />
          <Route path="voucherlist" element={<VoucherList />} />
          <Route path="addvoucher" element={<AddVoucher />} />
        </Routes>
      </div>
    </div>
  );
};

export default Vouchers;
