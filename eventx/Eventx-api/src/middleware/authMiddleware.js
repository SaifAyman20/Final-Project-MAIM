import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  // التحقق من وجود token في header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // استخراج token من header
      token = req.headers.authorization.split(" ")[1];
      
      // التحقق من صحة token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // إضافة بيانات المستخدم إلى request
      req.user = await User.findById(decoded.id).select("-password");
      
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;