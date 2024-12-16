import express from "express";

import userRoutes from "./modules/user/user.routes";
import authRoutes  from "./modules/auth/auth.routes"
import masterRoutes from "./modules/masters/master.routes";
import companiesRoutes from "./modules/companies/company.routes"
import { responseMiddleware } from "./middlewares/response.middleware";
import "./types/express/index"; // Ajusta la ruta según la estructura de tu proyecto

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para estandarizar las respuestas
app.use(responseMiddleware);

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes );
app.use("/api/masters", masterRoutes);
app.use("api/companies", companiesRoutes)

export default app;
