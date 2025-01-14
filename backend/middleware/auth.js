import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(tokenDecode.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        req.user = user; // Attach user object to the request
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authMiddleware;