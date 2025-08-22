import express, { json } from "express";
import nodemailer from "nodemailer";

//process.loadEnvFile();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(json());

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir todas las solicitudes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Encabezados permitidos
  next();
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.miCorreo,
    pass: process.env.SendMail,
  },
});

async function enviarCorreo(from, text, subject) {
  try {
    let info = await transporter.sendMail({
      from: from, 
      to: process.env.miCorreo, 
      subject: subject, 
      text: text,
      html: from + ' - ' +text,
    });

    console.log("Correo enviado:", info.messageId);
  } catch (err) {
    console.error("Error enviando correo:", err);
  }
}

// Ruta para enviar correos electrónicos
app.post("/contact", (req, res) => {
  const { from, text, subject } = req.body;
  console.log("Datos recibidos:", req.body);
  enviarCorreo(from, text, subject);
});

app.get("/", (req, res) => {
  res.send("Claudio Monguzzi Email API!");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
