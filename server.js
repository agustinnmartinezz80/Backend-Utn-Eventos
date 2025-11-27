import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import dotenv from "dotenv";

// ✅ CONFIGURACIÓN INICIAL CON TRY-CATCH
try {
    dotenv.config();

    const app = express();

    // ✅ CORS SIMPLIFICADO PERO EFECTIVO
    app.use(cors({
        origin: "https://frontend-utn-eventos.vercel.app",
        credentials: true
    }));

    app.use(express.json());

    // ✅ RUTA DE PRUEBA ANTES DE TODAS LAS DEMÁS
    app.get("/api/test", (req, res) => {
        res.json({ message: "✅ Backend funcionando!" });
    });

    // ✅ RUTAS PRINCIPALES CON MANEJO DE ERRORES
    app.use("/api/auth", authRoutes);
    app.use("/api/events", eventRoutes);

    // ✅ MANEJADOR DE ERRORES GLOBAL
    app.use((error, req, res, next) => {
        console.error("Error crítico:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    });

    const PORT = process.env.PORT || 3000;

    if (process.env.NODE_ENV !== 'production') {
        app.listen(PORT, () => {
            console.log(`Servidor en puerto ${PORT}`);
        });
    }



} catch (error) {
    console.error("❌ ERROR AL INICIAR LA APP:", error);
    // Exporta una app básica para que Vercel no falle
    const app = express();
    app.get("*", (req, res) => res.json({ error: "Server initializing" }));
    
}

export default app;