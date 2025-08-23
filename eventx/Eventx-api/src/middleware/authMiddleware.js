import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  // Expect header: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const raw = req.headers.authorization.split(" ")[1]; // get token after "Bearer"
      const decoded = jwt.verify(raw, process.env.JWT_SECRET); // verify token
      req.user = await User.findById(decoded.id).select("-password"); // attach user to req
      return next(); // allow access
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  return res.status(401).json({ message: "Not authorized, no token" });
};

export default protect;
