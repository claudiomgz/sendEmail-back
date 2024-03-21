import express, { json } from "express";
import { setApiKey, send } from "@sendgrid/mail";
process.loadEnvFile();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(json());

// Configurar la API key de SendGrid
setApiKey(process.env.PUBLIC_SENDGRID_API_KEY);

// Ruta para enviar correos electrónicos
app.post("/send-email", (req, res) => {
  const { to, from, subject, text } = req.body;

  const msg = {
    to,
    from,
    subject,
    text,
  };

  send(msg)
    .then(() => {
      res.send({
        success: true,
        message: "Correo electrónico enviado correctamente.",
      });
    })
    .catch((error) => {
      console.error("Error al enviar el correo electrónico:", error);
      res
        .status(500)
        .send({
          success: false,
          error: "Hubo un problema al enviar el correo electrónico.",
        });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
