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
      const response = await axios.get(`${url}/all`);
      if (response.data.success) {
        setVoucherList(response.data.data);
      } else {
        toast.error("Error fetching vouchers.");
      }
    } catch (error) {
      toast.error("Network error, please try again.");
    }
  };

  const handleUserClick = async (users) => {
    setSelectedVoucherUsers(users); // Store selected users to show in the popup
    fetchUsersByIds(users);
  };

  const fetchUsersByIds = async (userIds) => {
    try {
      // Fetch users based on the selected user IDs
      const response = await axios.post(`${url}/api/user/spec`, { userIds });
      if (response.data.success) {
        setSelectedVoucherUsers(response.data.users); // Store fetched users' data
      } else {
        toast.error("Error fetching users.");
      }
    } catch (error) {
      toast.error("Network error, please try again.");
    }
  };

  useEffect(() => {
    fetchVoucherList();
    console.log(selectedVoucherUsers);
  }, [selectedVoucherUsers]);

  return (
    <div className="voucherlist add flex-col">
      <div className="voucherlist-table">
        <div className="voucherlist-table-format title">
          <b>Amount</b>
          <b>Description</b>
          <b>Users</b>
          <b>Date Issued</b>
        </div>
        {voucherList.length === 0 ? (
          <div className="voucherlist-table-format"></div>
        ) : (
          voucherList.map((item, index) => {
            return (
              <div key={index} className="voucherlist-table-format">
                <p>
                  {currency}
                  {item.amount}
                </p>
                <p>{item.description || "No description"}</p>
                {/* Handle displaying users */}
                <p
                  className="user-count"
                  onClick={() => handleUserClick(item.selectedUsers)}
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {item.selectedUsers?.length || 0}
                </p>
                <p>{new Date(item.createdAt).toLocaleString()}</p>{" "}
                {/* Format date */}
              </div>
            );
          })
        )}
      </div>

      {/* Modal to show the list of users */}
      {selectedVoucherUsers && (
        <div className="userlist-table">
          <div className="userlist-table-format title">
            <b>Users Assigned</b>
            <b>
              {" "}
              <button
                onClick={() => setSelectedVoucherUsers(null)}
                style={{ color: "red" }}
              >
                Close
              </button>
            </b>
          </div>
          <div className="userlist-table-format">
            {selectedVoucherUsers.map((user, index) => (
              <p key={index}>{user.name}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherList;
