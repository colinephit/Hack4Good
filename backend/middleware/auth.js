import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    try {
      // Extract the Authorization header
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
      }
  
      // Verify the token using your JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);

      console.log("Decoded Token: ", decoded);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      // Attach the user object to the request for further use
      req.user = user;
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ success: false, message: error.message || "Invalid Token" });
    }
  };
  
  export default authMiddleware;

 