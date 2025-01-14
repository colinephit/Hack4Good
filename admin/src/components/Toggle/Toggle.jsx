import React from "react";
import "./Toggle.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Toggle = () => {
  return (
    <div className="toggle">
      <div className="toggle-options">
        <NavLink to="/orders/openorders" className="toggle-option">
          <img src={assets.history_icon} alt="" />
          <p>Pending Orders</p>
        </NavLink>
        <NavLink to="/orders/closedorders" className="toggle-option">
          <img src={assets.add_icon} alt="" />
          <p>Closed Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Toggle;
