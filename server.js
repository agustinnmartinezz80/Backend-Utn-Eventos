import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <h1>Backend UTN Eventos</h1>
        <p>El backend está ejecutándose correctamente. Aquí están los endpoints disponibles:</p>
        <pre>
POST /api/auth/login - Iniciar sesión
POST /api/auth/register - Registrar usuario
GET /api/events - Obtener eventos
POST /api/events - Crear evento
PUT /api/events/:id - Actualizar evento
DELETE /api/events/:id - Eliminar evento
        </pre>
    `);
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch((error) => {
        console.error("Error de conexión a MongoDB:", error);
        process.exit(1);
    });

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en puerto ${PORT}`);
    console.log(`Entorno: ${isProduction ? "Producción" : "Desarrollo"}`);
});

// Exportar el handler para Vercel
export default app;