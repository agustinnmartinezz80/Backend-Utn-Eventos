import * as eventService from "../services/eventService.js";

export const createEvent = async (req, res) => {
    try {
        const event = await eventService.create(req.user.id, req.body);
        res.status(201).json(event);    
    } catch (error) {
        res.status(500).json({ message: "Error creando evento" });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await eventService.getAllForUser(req.user.id);
        res.json(events);
    } catch {
        res.status(500).json({ message: "Error obteniendo eventos" });
    }
};

export const getEvent = async (req, res) => {
    try {
        const event = await eventService.getById(req.params.id);
        if (!event) return res.status(404).json({ message: "Evento no encontrado" });
        if (event.userId._id.toString() !== req.user.id)
            return res.status(403).json({ message: "No autorizado" });
        res.json(event);
    } catch {
        res.status(500).json({ message: "Error obteniendo evento" });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const event = await eventService.getById(req.params.id);
        if (!event) return res.status(404).json({ message: "Evento no encontrado" });
        if (event.userId._id.toString() !== req.user.id)
            return res.status(403).json({ message: "No autorizado" });

        const updated = await eventService.update(req.params.id, req.body);
        res.json(updated);
    } catch {
        res.status(500).json({ message: "Error actualizando evento" });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await eventService.getById(req.params.id);
        if (!event) return res.status(404).json({ message: "Evento no encontrado" });
        if (event.userId._id.toString() !== req.user.id)
            return res.status(403).json({ message: "No autorizado" });

        await eventService.remove(req.params.id);
        res.json({ message: "Evento eliminado" });
    } catch {
        res.status(500).json({ message: "Error eliminando evento" });
    }
};
