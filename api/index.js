import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import eventRoutes from "../routes/eventRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Configura CORS correctamente
app.use(cors({
    origin: "https://frontend-utn-eventos.vercel.app", // tu frontend en Vercel
    methods: ["GET", "POST", "PUT", "DELETE"],

}));

// Monta las rutas bajo /api
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Ruta de prueba
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));

export default app;
