import express from "express";
import { loginUser, registerUser, verifyEmailController } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verify/:id", verifyEmailController);

export default router;
