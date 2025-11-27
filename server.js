import express from "express";
import cors from "cors";

const app = express();

// CORS MÁXIMO
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());

// SOLO RUTAS BÁSICAS - ELIMINA TODOS LOS IMPORTS COMPLEJOS
app.get("/api/auth/ping", (req, res) => {
    res.json({ message: "pong", status: "working" });
});

app.post("/api/auth/login", (req, res) => {
    res.json({
        message: "login simulated",
        token: "test-token-123",
        user: { email: req.body.email, id: 1 }
    });
});

app.get("/api/events", (req, res) => {
    res.json({ events: [] });
});

// Ruta de salud
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default app;