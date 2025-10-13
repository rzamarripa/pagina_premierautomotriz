// Script rápido para probar la conexión SMTP
require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("🔧 Probando configuración SMTP...\n");

// Verificar variables de entorno
console.log("📋 Variables de entorno:");
console.log(
  "EMAIL_USER:",
  process.env.EMAIL_USER ? "✅ Configurado" : "❌ No configurado"
);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "✅ Configurado" : "❌ No configurado"
);

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log("\n❌ ERROR: Faltan credenciales SMTP");
  console.log("📝 Crea un archivo .env con:");
  console.log("EMAIL_USER=tu_correo@dominio.com");
  console.log("EMAIL_PASS=tu_contraseña");
  process.exit(1);
}

// Configuración del transportador
const transporter = nodemailer.createTransporter({
  host: "secure.emailsrvr.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Probar conexión
transporter.verify(function (error, success) {
  if (error) {
    console.log("\n❌ Error de conexión SMTP:", error.message);
    console.log("\n🔧 Posibles soluciones:");
    console.log("1. Verifica las credenciales en .env");
    console.log("2. Verifica que el servidor SMTP sea correcto");
    console.log("3. Verifica que el puerto 465 esté abierto");
  } else {
    console.log("\n✅ Conexión SMTP exitosa");
    console.log("📧 Servidor listo para enviar correos");
  }
});
