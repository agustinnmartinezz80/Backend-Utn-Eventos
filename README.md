
# Backend - Gestor de Eventos

API REST para gestionar usuarios, autenticación y eventos.

## Tecnologías
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcrypt

---

# Endpoints

## Autenticación

### **POST /auth/register**
Registra un nuevo usuario.
**Body:**
```json
{
  "name": "Juan",
  "email": "juan@mail.com",
  "password": "123456"
}
```

### **POST /auth/login**
Inicia sesión y devuelve token JWT.
**Body:**
```json
{
  "email": "juan@mail.com",
  "password": "123456"
}
```

### **GET /auth/verify/:id**
Verifica el correo electrónico del usuario.

---

## Eventos (requiere token)

### **GET /events**
Obtiene todos los eventos.

### **GET /events/:id**
Obtiene un evento por ID.

### **POST /events**
Crea un nuevo evento.
**Body:**
```json
{
  "titulo": "Concierto",
  "descripcion": "Show en vivo",
  "fecha": "2025-12-01",
  "lugar": "Teatro",
  "tipo": "Concierto",
  "horaInicio": "20:00",
  "horaFin": "22:00"
}
```

### **PUT /events/:id**
Actualiza un evento existente.

### **DELETE /events/:id**
Elimina un evento.

---

#  Postman Collection
Incluye todos los endpoints.  
Archivo: `postman_collection.json`

---

#  Cómo ejecutar el backend

```
npm install
npm run dev
```

---

# Variables de entorno (.env)

```
PORT=4000
MONGO_URI=tu_conexion
JWT_SECRET=secreto
CLIENT_URL=http://localhost:5173
```
