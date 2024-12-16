import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtConstants } from "./jwt.config";

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: false,
      message: "Authentication token is missing or invalid",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, jwtConstants.secret) as jwt.JwtPayload;

    // Agregar los datos decodificados al objeto de solicitud
    req.user = {
      _id: decoded._id,
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};
