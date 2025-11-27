import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ CORS CONFIGURACIÓN COMPLETA
app.use(cors({
    origin: "https://frontend-utn-eventos.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(express.json());

// ✅ RUTAS CON PREFIJO /api
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// ✅ RUTA DE PRUEBA DIRECTA
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!", timestamp: new Date().toISOString() });
});

// ✅ RUTA DE FALLBACK
app.use("*", (req, res) => {
    res.status(404).json({ 
        error: "Route not found",
        requestedUrl: req.originalUrl
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`✅ CORS enabled for frontend`);
});

export default app;