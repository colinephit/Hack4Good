import React, { useEffect, useState } from "react";
import "./ClosedOrders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets, url, currency } from "../../assets/assets";

const ClosedOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchClosedOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        // Filter for only 'approved' or 'rejected' orders
        const closedOrders = response.data.data.filter(
          (order) => order.status === "approved" || order.status === "rejected"
        );
        setOrders(closedOrders.reverse());
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchClosedOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Closed Orders</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">User ID: {order.userId}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>
                {currency}
                {order.amount}
              </p>
              <p>Ordered on: {formatDate(order.createdAt)}</p>
              <p>
                Status: <strong>{order.status}</strong>
              </p>
              <p>
                Closed on: {order.closedAt ? formatDate(order.closedAt) : "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p>No closed orders available.</p>
        )}
      </div>
    </div>
  );
};

export default ClosedOrders;
