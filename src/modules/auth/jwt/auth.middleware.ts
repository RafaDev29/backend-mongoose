import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtConstants } from "./jwt.config";

interface JwtPayload {
  _id: string;
  username: string;
  role: string;
}

export const authMiddleware = (requiredRole?: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        status: false,
        message: "Authentication token is missing or invalid",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, jwtConstants.secret) as JwtPayload;

      req.user = decoded; // Ahora `req.user` está correctamente tipado

      if (requiredRole && decoded.role !== requiredRole) {
        res.status(403).json({
          status: false,
          message: `Forbidden: You must have the ${requiredRole} role to access this resource`,
        });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({
        status: false,
        message: "Invalid or expired token",
      });
    }
  };
};
