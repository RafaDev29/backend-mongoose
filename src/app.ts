import express from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());



export default app;
