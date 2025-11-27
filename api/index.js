// api/index.js
import express from "express";
import authRoutes from "../routes/authRoutes.js";
import eventRoutes from "../routes/eventRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

export default app; // <- Muy importante
