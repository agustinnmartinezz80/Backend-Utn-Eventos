import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

dotenv.config();
const app = express();

// Conectar a la base de datos
conectarDB();

// Configuración de CORS
const allowedOrigin = process.env.FRONTEND_URL;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", allowedOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));

// Parseo de JSON
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Exportar app para Vercel
export default app;
