import express, { json } from "express";
import sgMail from "@sendgrid/mail";
process.loadEnvFile();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(json());

// Configurar la API key de SendGrid
sgMail.setApiKey(process.env.PUBLIC_SENDGRID_API_KEY);

// Ruta para enviar correos electrónicos
app.post("/contact", (req, res) => {
  const { from, text, subject } = req.body;

  const msg = {
    to: "claudiomonguzzi80@gmail.com",
    from,
    subject,
    text,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.send({
        success: true,
        message: "Correo electrónico enviado correctamente.",
      });
    })
    .catch((error) => {
      console.error("Error al enviar el correo electrónico:", error);
      res.status(500).send({
        success: false,
        error: "Hubo un problema al enviar el correo electrónico.",
      });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
