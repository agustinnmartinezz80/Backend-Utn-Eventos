import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

dotenv.config();
const app = express();


conectarDB();


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://TU-DOMINIO-DEL-RAILWAY" 
    ],
    credentials: true
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
});

