import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtConstants } from "./jwt.config";

interface JwtPayload {
  _id: string;
  username: string;
  role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, jwtConstants.secret) as JwtPayload;

    // Agregar datos decodificados al objeto de solicitud
    (req as any).user = decoded;

    // Verificar si el rol es SUPER_MASTER
    if (decoded.role !== "SUPER_MASTER") {
      res.status(403).json({
        status: false,
        message: "Forbidden: You do not have the necessary permissions",
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
