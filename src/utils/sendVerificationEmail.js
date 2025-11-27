import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, userId) => {
    const verificationLink = `${process.env.FRONTEND_URL}/api/auth/verify/${userId}`;



    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Gestor de Eventos" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verifica tu cuenta",
        html: `
            <h2>¡Bienvenido!</h2>
            <p>Haz clic para activar tu cuenta:</p>
            <a href="${verificationLink}" target="_blank">${verificationLink}</a>
        `
    };

    await transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;

