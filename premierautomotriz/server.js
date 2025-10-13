const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Agregar soporte para JSON

// Configuración del transportador
const transporter = nodemailer.createTransport({
  host: "secure.emailsrvr.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verificar la conexión al servidor SMTP
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("Error de conexión:", error);
//   } else {
//     console.log("Servidor listo para enviar correos");
//   }
// });

(async () => {
  const fetch = await import("node-fetch");

  app.post("/enviar-correo", async (req, res) => {
    const {
      name,
      email,
      subject,
      phone,
      service,
      message,
      "g-recaptcha-response": recaptchaResponse,
    } = req.body;

    // Validar campos requeridos
    if (!name || !email || !phone || !message) {
      return res.status(400).send("Faltan campos requeridos");
    }

    try {
      // Verificar reCAPTCHA solo si está presente
      if (recaptchaResponse) {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (secretKey) {
          const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
          const response = await fetch.default(verificationUrl, {
            method: "POST",
          });
          const body = await response.json();
          if (!body.success) {
            return res.status(400).send("Error de verificación de reCAPTCHA");
          }
        }
      }

      // Continuar con el envío del correo si reCAPTCHA es válido
      const bodyMessage = `
        <h1>Página Premier Automotriz</h1>
        <p>Nombre: ${name}</p>
        <p>Email: ${email}</p>
        <p>Asunto: ${subject}</p>
        <p>Teléfono: ${phone}</p>
        <p>Servicio: ${service}</p>
        <p>Mensaje: ${message}</p>
      `;

      const mailOptions = {
        from: "hola@camaleonmarketingstudio.com",
        to: "roberto@masoft.mx",
        subject: `Página Premier Automotriz: ${name} - ${subject}`,
        html: bodyMessage,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo:", error);
          return res.status(500).send("Error al enviar el correo");
        }
        res.status(200).send("Correo enviado exitosamente");
      });
    } catch (error) {
      console.error("Error al verificar reCAPTCHA:", error);
      res.status(500).send("Error al verificar reCAPTCHA");
    }
  });

  app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
  });
})();
