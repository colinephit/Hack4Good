import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import { url, currency } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);

  const fetchUserList = async () => {
    try {
      const response = await axios.get(`${url}/api/user/all`);
      if (response.data.success) {
        // Filter out users with role "admin"
        const filteredUsers = response.data.users.filter(
          (user) => user.role === "user"
        );
        setUserList(filteredUsers);
      } else {
        toast.error("Error fetching users.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error, please try again.");
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    try {
      const response = await axios.put(`${url}/api/user/toggle-status/${userId}`);
      if (response.data.success) {
        toast.success(`User status changed to ${response.data.user.status}`);
        fetchUserList(); // Refresh the user list
      } else {
        toast.error("Failed to update user status.");
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("An error occurred while toggling user status.");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${url}/api/user/${userId}`);
      if (response.data.success) {
        toast.success("User deleted successfully");
        fetchUserList(); // Refresh the user list
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting user.");
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [userList]);

  return (
    <div className="userlist add flex-col">
      <div className="userlist-table">
        <div className="userlist-table-format title">
          <b>Name</b>
          <b>Mobile</b>
          <b>Vouchers</b>
          <b>Status</b>
          <b>Disable</b>
          <b>Delete</b>
          <b></b>
        </div>
        {userList.length === 0 ? (
          <div className="userlist-table-format"></div>
        ) : (
          userList.map((user, index) => {
            return (
              <div key={index} className="userlist-table-format">
                <p>{user.name}</p>
                <p>{user.number}</p>
                <p>
                  {currency}
                  {user.amount}
                </p>
                <p className={user.status === "active" ? "status-active" : "status-inactive"}>
                  {user.status === "active" ? "Active" : "Inactive"}
                </p>
                <p>
                  <button
                    onClick={() => toggleStatus(user._id, user.status)}
                    className={user.status === "active" ? "btn-disable" : "btn-enable"}
                  >
                    {user.status === "active" ? "Disable" : "Enable"}
                  </button>
                </p>
                <p>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserManagement;
