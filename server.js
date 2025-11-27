import express from "express";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();

// ✅ CORS MANUAL INFALIBLE
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

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Ruta de prueba
app.get("/api/auth/ping", (req, res) => {
    console.log("✅ Ping recibido - CORS funcionando");
    res.json({ message: "pong", cors: "working" });
});

// ✅ AGREGA ESTO SI FALTA - INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

export default app;