import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "../src/config/db.js";
import authRoutes from "../src/routes/authRoutes.js";
import eventRoutes from "../src/routes/eventRoutes.js";

dotenv.config();
const app = express();

// Conectar a MongoDB
conectarDB();

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// Parseo JSON
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Ruta ping para despertar el backend
app.get("/api/auth/ping", (req, res) => {
    res.json({ ok: true });
});

export default app;
