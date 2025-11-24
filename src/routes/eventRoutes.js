import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
