import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protect = (...roles) => {

  return async (req, res, next) => {

    try {

      let token;

      // CHECK TOKEN
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      // NO TOKEN
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // FIND ADMIN
      const admin = await Admin.findById(decoded.id).select("-password");

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }

      // STORE USER
      req.user = admin;

      // ROLE CHECK
      if (
        roles.length > 0 &&
        !roles.includes("admin")
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      next();

    } catch (error) {

      console.log("AUTH ERROR:", error);

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};