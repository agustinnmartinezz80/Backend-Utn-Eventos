import express from "express";
import { loginUser, registerUser, verifyEmailController } from "../controllers/authController.js"


const router = express.Router();

router.get("/verify/:id", verifyEmailController);
router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;

