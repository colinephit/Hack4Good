import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            quantity: req.body.quantity,
            image: image_filename,
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// update quantity
const updateFood = async (req, res) => {
    try {
        const { id, quantity } = req.body;
        const food = await foodModel.findById(id);

        if (!food) {
        return res.json({ success: false, message: "Food item not found" });
        }

        // Update the quantity
        food.quantity = quantity;

        // Save the updated food item
        await food.save();

        res.json({ success: true, message: "Quantity updated successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error updating quantity" });
    }
}

export { listFood, addFood, removeFood, updateFood }