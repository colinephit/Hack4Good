import React, { useEffect, useState } from "react";
import "./List.css";
import { url, currency } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const [quantities, setQuantities] = useState({});

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);

      const initialQuantities = response.data.data.reduce((acc, item) => {
        acc[item._id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    } else {
      toast.error("Error");
    }
  };

  const updateQuantity = async (foodId) => {
    const response = await axios.post(`${url}/api/food/update`, {
      id: foodId,
      quantity: quantities[foodId],
    });
    if (response.data.success) {
      toast.success("Quantity updated!");
    } else {
      toast.error("Error updating quantity");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  const handleQuantityChange = (foodId, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: newQuantity,
    }));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Items List</p>
      <div className="list-table">
        <div className="item-table title flex-row">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Quantity</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="item-table flex-row">
              <img
                className="image"
                src={`${url}/images/` + item.image}
                alt=""
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <input
                type="number"
                value={quantities[item._id] || ""}
                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                onBlur={() => updateQuantity(item._id)} // Optional: Save when focus is lost
                className="quantity-input"
              />
              <p className="cursor" onClick={() => removeFood(item._id)}>
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
