import React, { useEffect, useState } from "react";
import "./VoucherList.css";
import { url, currency } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const VoucherList = () => {
  const [voucherList, setVoucherList] = useState([]);
  const [selectedVoucherUsers, setSelectedVoucherUsers] = useState(null);

  const fetchVoucherList = async () => {
    try {
      const response = await axios.get(`${url}/api/voucher/list`);
      if (response.data.success) {
        setVoucherList(response.data.data);
      } else {
        toast.error("Error fetching vouchers.");
      }
    } catch (error) {
      toast.error("Network error, please try again.");
    }
  };

  const handleUserClick = (users) => {
    setSelectedVoucherUsers(users); // Store selected users to show in the popup
  };

  useEffect(() => {
    fetchVoucherList();
  }, []);

  return (
    <div className="list add flex-col">
      <div className="list-table">
        <div className="list-table-format title">
          <b>Amount</b>
          <b>Description</b>
          <b>Users</b>
          <b>Date Issued</b>
        </div>
        {voucherList.length === 0 ? (
          <div className="list-table-format"></div>
        ) : (
          voucherList.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <p>
                  {currency}
                  {item.amount}
                </p>
                <p>{item.description || "No description"}</p>
                {/* Handle displaying users */}
                <p>{item.description || "No description"}</p>
                {/* Show number of users, and on click show the list of users */}
                <p
                  className="user-count"
                  onClick={() => handleUserClick(item.users)}
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {item.users?.length || 0} users
                </p>
                <p>{new Date(item.createdAt).toLocaleDateString()}</p>{" "}
                {/* Format date */}
              </div>
            );
          })
        )}
      </div>

      {/* Modal to show the list of users */}
      {selectedVoucherUsers && (
        <div className="user-modal">
          <div className="modal-content">
            <h3>Users Assigned to Voucher</h3>
            <ul>
              {selectedVoucherUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
            <button onClick={() => setSelectedVoucherUsers(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherList;
