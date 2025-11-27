import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import eventRoutes from "../routes/eventRoutes.js";

const app = express();

// Configuración más robusta de CORS
const corsOptions = {
    origin: "https://frontend-utn-eventos.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin"
    ],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Manejar preflight requests globalmente
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());

// Monta las rutas bajo /api
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Ruta de prueba
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));

export default app;