import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import eventRoutes from "../routes/eventRoutes.js";

const app = express();

app.use(express.json());

// ✅ Configura CORS para tu frontend en producción
app.use(cors({
    origin: "https://frontend-utn-eventos.vercel.app",
    credentials: true // si estás usando cookies / headers de autenticación
}));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

export default app;
