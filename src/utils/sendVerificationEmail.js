import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, userId) => {
    // Usar FRONTEND_URL si está definida, de lo contrario usar VERCEL_URL
    const frontendUrl = process.env.FRONTEND_URL || `https://${process.env.VERCEL_URL}`;
    const verificationLink = `${frontendUrl}/verify-email/${userId}`;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, 
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, 
            },
            debug: true, 
            logger: true, 
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
