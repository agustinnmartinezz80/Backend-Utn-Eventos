import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import eventRoutes from "../routes/eventRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// CORS configurado para tu frontend
app.use(cors({
    origin: "https://frontend-utn-eventos.vercel.app", // tu frontend en Vercel
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // permite enviar cookies si es necesario
}));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

export default app;
