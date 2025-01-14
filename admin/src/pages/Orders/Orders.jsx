import React from "react";
import Toggle from "../../components/Toggle/Toggle";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OpenOrders from "../OpenOrders/OpenOrders";
import ClosedOrders from "../ClosedOrders/ClosedOrders";
import "./Orders.css";

const Orders = () => {
  return (
    <div className="inside">
      <ToastContainer />
      <div className="app-content">
        <Toggle />
        <Routes>
          <Route path="/" element={<Navigate to="openorders" />} />
          <Route path="openorders" element={<OpenOrders />} />
          <Route path="closedorders" element={<ClosedOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Orders;
