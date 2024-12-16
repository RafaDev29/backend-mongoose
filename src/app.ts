import express from "express";
import userRoutes from "./modules/user/user.routes";
import { responseMiddleware } from "./middlewares/response.middleware";

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para estandarizar las respuestas
app.use(responseMiddleware);

// Rutas
app.use("/api/users", userRoutes);

export default app;
