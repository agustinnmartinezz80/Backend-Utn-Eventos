import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";
import nodemailer from "nodemailer";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Datos recibidos para registro:", { name, email });

        const existe = await User.findOne({ email });
        if (existe) {
            console.log("El correo ya está registrado:", email);
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Contraseña encriptada correctamente.");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verified: false,
        });

        console.log("Usuario creado en la base de datos:", user);

        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.verify();
            console.log("Credenciales de correo verificadas correctamente.");
        } catch (error) {
            console.error("Error verificando credenciales de correo:", error);
            return res.status(500).json({ message: "Error con las credenciales de correo." });
        }

        try {
            await sendVerificationEmail(user.email, user._id);
            console.log("Correo de verificación enviado a:", user.email);
        } catch (error) {
            console.error("Error enviando correo de verificación:", error);
            return res.status(500).json({ message: "Error al enviar el correo de verificación." });
        }

        return res.status(201).json({
            message: "Usuario registrado. Verifica tu correo electrónico.",
        });
    } catch (error) {
        console.error("Error en el registro de usuario:", error);
        return res.status(500).json({ message: "Error al registrar usuario" });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado. Verifica tu correo electrónico." });

        if (!user.verified)
            return res.status(400).json({ message: "Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta. Intenta nuevamente." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor. Por favor, intenta más tarde." });
    }
};


export const verifyEmailController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        if (user.verified) {
            return res.redirect(`${process.env.VERCEL_URL}`);
        }

        user.verified = true;
        await user.save();

        return res.redirect(`${process.env.VERCEL_URL}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al verificar la cuenta" });
    }
};

export const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        if (user.verified) {
            return res.status(400).json({ message: "El usuario ya está verificado." });
        }

        await sendVerificationEmail(user.email, user._id);
        res.json({ message: "Correo de verificación reenviado." });
    } catch (error) {
        console.error("Error reenviando correo de verificación:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};