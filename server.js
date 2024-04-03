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
  const { message, name, email } = req.body;

  const msg = {
    to: "claudiomonguzzi80@gmail.com",
    message,
    name,
    email,
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

app.get("/", (req, res) => {
  res.send("Claudio Monguzzi API!");
});

// Ruta para mostrar un mensaje de bienvenida en la raíz de la API.
// app.get("/", (req, res) => {
//   res.send(
//     <a>
//       <h1>Bienvenido a la API de Claudio Monguzzi</h1>
//       <p>Esta API permite enviar correos electrónicos desde un sitio web.</p>
//       <p>
//         Para enviar un correo electrónico, utiliza la ruta "/contact" y envía
//         los datos necesarios en el cuerpo de la solicitud.
//       </p>
//       <p>Ejemplo de solicitud:</p>
//       <pre>
//         {`{
//   "from": "Su email",
//   "text": "Hola, qué tal?",
//   "subject": "Prueba de correo electrónico"
// }`}
//       </pre>
//       <p>Para ver la documentación de la API, consulta la página de </p>
//       <a href="https://github.com/claudiomgz/sendEmail-back#readme">
//       GitHub
//       </a>
//     </a>
//   );
// });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
