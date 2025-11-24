import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, required: true },
    lugar: { type: String, required: true },
    tipo: { type: String },
    horaInicio: { type: String },
    horaFin: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
