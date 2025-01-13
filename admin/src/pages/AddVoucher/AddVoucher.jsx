import React, { useState } from "react";
import "./AddVoucher.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddVoucher = () => {
  const [data, setData] = useState({
    amount: "",
    description: "",
    selectedUsers: [], // Array to store selected user IDs
    createdAt: "", // Timestamp for voucher creation
  });

  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // const fetchUsers = async () => {
  //   const response = await axios.get(`${url}/api/user/list`);
  //   if (response.data.success) {
  //     setUsers(response.data.data);
  //   } else {
  //     toast.error("Error");
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const toggleUserSelection = (userId) => {
    setData((prevData) => {
      const selectedUsers = prevData.selectedUsers.includes(userId)
        ? prevData.selectedUsers.filter((id) => id !== userId) // Deselect user
        : [...prevData.selectedUsers, userId]; // Select user
      return { ...prevData, selectedUsers };
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all users
      setData((prevData) => ({ ...prevData, selectedUsers: [] }));
    } else {
      // Select all user IDs
      setData((prevData) => ({
        ...prevData,
        selectedUsers: users.map((user) => user._id),
      }));
    }
    setSelectAll(!selectAll);
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("amount", Number(data.amount));
    formData.append("description", data.description);
    formData.append("selectedUsers", JSON.stringify(data.selectedUsers));
    formData.append("createdAt", new Date().toISOString());

    try {
      const response = await axios.post(`${url}/api/voucher/add`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          amount: "",
          description: "",
          selectedUsers: [],
          createdAt: "",
        });
        setSelectAll(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding voucher");
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* Voucher amount input */}
        <div className="add-product-name flex-col">
          <label htmlFor="amount">Voucher Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter amount"
            value={data.amount}
            onChange={onChangeHandler}
            min="1" // Ensure only positive values can be entered
            required
          />
        </div>

        {/* Description input */}
        <div className="add-product-description flex-col">
          <p>Description (Optional)</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            rows={6}
            placeholder="Enter description"
          />
        </div>

        {/* User selection */}
        <div className="add-product-description flex-col">
          <p>Issue to:</p>
          {/* Select All Button */}
          <div className="add-product-description flex-col">
            <label>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span> Select All</span>
            </label>
          </div>
          <div className="user-table">
            {users.map((user) => (
              <div key={user._id} className="user-row">
                <label>
                  <input
                    type="checkbox"
                    checked={data.selectedUsers.includes(user._id)}
                    onChange={() => toggleUserSelection(user._id)}
                  />
                  <span>{user.name}</span>
                </label>
                <p>
                  {currency}
                  {user.vouchers || 0} {/* Display user's vouchers */}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddVoucher;
