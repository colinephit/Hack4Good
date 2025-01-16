// import React from 'react'
// import './Inventory.css'
// import { DataTableDemo } from './datatable';

// const UserManagement = () => {
//   return (
//     <div className="container mx-auto py-10">
//     <DataTableDemo />
//     </div>
//   )
// }

// export default UserManagement

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
                <p>{user.status}</p>{" "}
                <p>add the button to enable/disable/delete user here</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserManagement;
