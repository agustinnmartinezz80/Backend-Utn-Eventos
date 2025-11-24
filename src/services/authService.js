import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "../repositories/userRepository.js";


export const registerUser = async ({ name, email, password }) => {
if (password.length < 6) {
throw new Error("La contraseña debe tener mínimo 6 caracteres");
}


const existingUser = await findUserByEmail(email);
if (existingUser) {
throw new Error("El email ya está registrado");
}


const hashedPassword = await bcrypt.hash(password, 10);


const newUser = await createUser({ name, email, password: hashedPassword });


return newUser;
};