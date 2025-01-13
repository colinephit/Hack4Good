import React from "react";
import "./Menu.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-options">
        <NavLink to="/vouchers/voucherlist" className="menu-option">
          <img src={assets.order_icon} alt="" />
          <p>Voucher History</p>
        </NavLink>
        <NavLink to="/vouchers/addvoucher" className="menu-option">
          <img src={assets.order_icon} alt="" />
          <p>Issue Voucher</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu;
