import { Router } from "express";
import { CompanyController } from "./company.controller";
import { authMiddleware } from "../auth/jwt/auth.middleware";

const router = Router();
const companyController = new CompanyController();

// Ruta para crear compañías, protegida para usuarios con rol MASTER
router.post("/", authMiddleware("MASTER"), companyController.createCompany);

export default router;
