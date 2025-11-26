import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "../src/config/db.js";
import authRoutes from "../src/routes/authRoutes.js";
import eventRoutes from "../src/routes/eventRoutes.js";

dotenv.config();
const app = express();

// Conectar a la DB
conectarDB();

// Configuración de CORS y manejo de preflight
const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Manejar preflight OPTIONS requests
app.options("*", cors({
    origin: allowedOrigin,
    credentials: true
}));

// Parseo JSON
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Exportar app para Vercel
export default app;
