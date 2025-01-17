import React, { useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";
import { url } from "../../assets/assets";

const FoodDisplay = ({ category }) => {
  const { foodListState } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top products purchased</h2>
      <div className="food-display-list">
        {foodListState.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                image={`${url}/images/` + item.image}
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
