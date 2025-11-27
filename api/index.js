import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "../src/config/db.js";
import authRoutes from "../src/routes/authRoutes.js";
import eventRoutes from "../src/routes/eventRoutes.js";

dotenv.config();
const app = express();

// Conectar DB
conectarDB();

// Configuración CORS
const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Parseo JSON
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// --- NO usar app.options("*", ...) ---
// Express maneja OPTIONS automáticamente cuando cors está configurado correctamente

export default app;
