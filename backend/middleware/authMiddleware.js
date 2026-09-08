import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token failed",
      error: error.message,
    });
  }
};

export { protect };

// const protect = async (req, res, next) => {
//   try {
//     let token;

//     // Get token from Authorization header
//     if (token && token.startsWith("Bearer ")) {
//       token = token.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } else {
//       res.status(401).json({ message: "Not authorized, no token" });
//     }
//   } catch (error) {
//     res.status(401).json({ message: "Token failed", error: error.message });
//   }
// };
