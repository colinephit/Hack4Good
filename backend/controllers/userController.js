import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

// Create Token
const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken({id: user._id, role: user.role});
        res.json({ success: true, token, role: user.role, });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token, role: user.role, });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Admin: Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, "-password"); // Exclude passwords
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
};

// Admin: Add a New User
const addUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            role: role || "user", // Default to "user" role
        });

        const savedUser = await newUser.save();
        res.status(201).json({ success: true, user: savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding user" });
    }
};

// Admin: Update a User
const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating user" });
    }
};

// Admin: Delete a User
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting user" });
    }
};

export {
    loginUser,
    registerUser,
    getAllUsers, // Admin-specific
    addUser,     // Admin-specific
    updateUser,  // Admin-specific
    deleteUser,  // Admin-specific
};