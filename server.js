import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import eventRoutes from "../routes/eventRoutes.js";

const app = express();

// CORS PRIMERO - Configuración más robusta
app.use(cors({
    origin: "https://frontend-utn-eventos.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

// Manejar preflight requests explícitamente
app.options("*", cors());

// Middleware
app.use(express.json());

// Monta las rutas - VERIFICA QUE ESTÉN BIEN LOS PATHS
app.use("/api/auth", authRoutes);  // ← Las rutas de auth empiezan con /api/auth
app.use("/api/events", eventRoutes);

// Ruta de prueba
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));

export default app;