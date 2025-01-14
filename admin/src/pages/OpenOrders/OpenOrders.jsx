import React, { useEffect, useState } from "react";
import "./OpenOrders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets, url, currency } from "../../assets/assets";

const OpenOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        // Filter for only 'pending' orders
        const pendingOrders = response.data.data.filter(
          (order) => order.status === "pending"
        );
        setOrders(pendingOrders.reverse());
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating order status");
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
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Pending Orders</h3>
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
                <p className="order-item-name">{order.userId}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>
                {currency}
                {order.amount}
              </p>
              <p>Ordered on: {formatDate(order.createdAt)}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status} // Ensure the dropdown reflects the current status
                name="orderStatus"
                id={`status-${order._id}`} // Add unique ID for accessibility
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          ))
        ) : (
          <p>No pending orders available.</p>
        )}
      </div>
    </div>
  );
};

export default OpenOrders;
