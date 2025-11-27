import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
    "https://frontend-utn-eventos.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
console.log("Servidor backend escuchando en puerto ${ PORT }");
});

export default app;