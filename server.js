import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

dotenv.config();
const app = express();



conectarDB();

const allowedOrigin = process.env.FRONTEND_URL;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", allowedOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));


app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
});

