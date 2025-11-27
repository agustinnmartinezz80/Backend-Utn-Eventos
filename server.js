import express from "express";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();

// ✅ CORS MANUAL - ELIMINA COMPLETAMENTE LA DEPENDENCIA CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://frontend-utn-eventos.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.get("/api/auth/ping", (req, res) => res.json({ message: "pong" }));

export default app;