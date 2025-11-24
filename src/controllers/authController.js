import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existe = await User.findOne({ email });
        if (existe)
            return res.status(400).json({ message: "El correo ya está registrado" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verified: false,
        });

        await sendVerificationEmail(user.email, user._id);

        return res.status(201).json({
            message: "Usuario registrado. Verifica tu correo electrónico.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar usuario" });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        if (!user.verified)
            return res
                .status(400)
                .json({ message: "Debes verificar tu correo antes de iniciar sesión" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

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
        return res.status(500).json({ message: "Error en login" });
    }
};


export const verifyEmailController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        if (user.verified)
            return res.json({ message: "La cuenta ya estaba verificada." });

        user.verified = true;
        await user.save();

        return res.json({
            message: "Cuenta verificada correctamente. Ya puedes iniciar sesión.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al verificar la cuenta" });
    }
};
