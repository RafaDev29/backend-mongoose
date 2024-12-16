import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const authController = new AuthController();

// Función de utilidad para manejar errores de promesas en Express
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Rutas
router.post("/login", asyncHandler(authController.login));

export default router;
