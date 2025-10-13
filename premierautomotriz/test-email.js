/**
 * Script de prueba para verificar el envío de correos
 * Ejecutar: node test-email.js
 */

require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("🧪 Iniciando prueba de envío de correo...\n");

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

// Verificar la conexión
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Error de conexión SMTP:", error);
    console.log("\n📋 Verifica:");
    console.log("   1. Archivo .env existe en premierautomotriz/");
    console.log("   2. EMAIL_USER está configurado correctamente");
    console.log("   3. EMAIL_PASS está configurado correctamente");
    console.log("   4. Las credenciales son válidas");
  } else {
    console.log("✅ Conexión SMTP exitosa");
    console.log("📧 Servidor listo para enviar correos\n");

    // Enviar correo de prueba
    const mailOptions = {
      from: process.env.EMAIL_USER || "hola@camaleonmarketingstudio.com",
      to: "roberto@masoft.mx, hola@camaleonmarketingstudio.com",
      subject: `🧪 Prueba de Correo - Premier Automotriz`,
      html: `
        <h1>✅ Prueba de Correo Exitosa</h1>
        <p><strong>Este es un correo de prueba del sistema de contacto.</strong></p>
        <hr>
        <p><strong>Nombre:</strong> Usuario de Prueba</p>
        <p><strong>Email:</strong> prueba@ejemplo.com</p>
        <p><strong>Teléfono:</strong> 6671234567</p>
        <p><strong>Servicio:</strong> Bolsa de Trabajo</p>
        <p><strong>Mensaje:</strong> Este es un mensaje de prueba para verificar que el sistema de correos funciona correctamente.</p>
        <hr>
        <p style="color: #28a745;"><em>Si recibes este correo, el sistema está funcionando correctamente.</em></p>
        <p><small>Fecha: ${new Date().toLocaleString("es-MX", {
          timeZone: "America/Mexico_City",
        })}</small></p>
      `,
    };

    console.log("📤 Enviando correo de prueba...");

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Error al enviar el correo:", error);
      } else {
        console.log("✅ Correo enviado exitosamente!");
        console.log("📩 Message ID:", info.messageId);
        console.log("\n🎉 Sistema de correos funcionando correctamente!");
        console.log("\n📋 Próximos pasos:");
        console.log("   1. Revisa la bandeja de entrada de los destinatarios");
        console.log("   2. Si no aparece, revisa la carpeta de spam");
        console.log("   3. Inicia el servidor con: npm start");
        console.log("   4. Prueba el formulario desde el navegador");
      }

      // Cerrar conexión
      transporter.close();
    });
  }
});
