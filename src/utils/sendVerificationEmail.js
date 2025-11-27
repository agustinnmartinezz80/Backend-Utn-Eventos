import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, userId) => {
    const verificationLink = `${process.env.VERCEL_URL}/verify/${userId}`;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            debug: true, // Habilitar logs detallados
            logger: true, // Mostrar logs en consola
        });

        await transporter.verify();
        console.log("Credenciales de correo verificadas correctamente.");

        const mailOptions = {
            from: `"Gestor de Eventos" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verifica tu cuenta",
            html: `
                <h2>¡Bienvenido!</h2>
                <p>Haz clic para activar tu cuenta:</p>
                <a href="${verificationLink}" target="_blank">${verificationLink}</a>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Correo enviado correctamente.");
    } catch (error) {
        console.error("Error enviando correo:", error);
        throw new Error("Error al enviar el correo de verificación.");
    }
};

export default sendVerificationEmail;