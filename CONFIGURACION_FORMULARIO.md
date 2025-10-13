# 📧 Configuración del Sistema de Formulario de Contacto

## 🚀 Sistema Implementado

Se ha implementado un sistema completo de formulario de contacto con las siguientes características:

### ✅ Características Principales

1. **Validación Completa en Español**

   - Validación de nombre (mínimo 3 caracteres)
   - Validación de email con regex
   - Validación de teléfono (mínimo 10 dígitos)
   - Validación de mensaje (mínimo 10 caracteres)
   - Validación en tiempo real al escribir
   - Mensajes de error personalizados

2. **UI/UX Mejorada**

   - Loading spinner durante el envío
   - Mensajes de éxito atractivos con iconos
   - Mensajes de error descriptivos
   - Animaciones suaves (fadeIn)
   - Botón deshabilitado durante el envío
   - Auto-ocultamiento de mensajes después de 10 segundos

3. **Integración con Backend Node.js**
   - Envío de datos en formato JSON
   - Manejo de errores HTTP
   - Timeout de 30 segundos
   - Mensajes de error específicos según el código HTTP

## 📋 Configuración Paso a Paso

### 1. Variables de Entorno (.env)

Crea un archivo `.env` en la carpeta `premierautomotriz/`:

```env
# Configuración de correo
EMAIL_USER=tu_correo@dominio.com
EMAIL_PASS=tu_contraseña_aqui

# Configuración de reCAPTCHA (opcional)
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key
```

### 2. Iniciar el Servidor Node.js

```bash
cd premierautomotriz
npm install
npm start
```

El servidor se iniciará en `http://localhost:3000`

### 3. Actualizar la URL del API

En el archivo `landing/js/form.js`, línea 5, actualiza la URL según tu entorno:

**Para desarrollo local:**

```javascript
const API_URL = "http://localhost:3000/enviar-correo";
```

**Para producción:**

```javascript
const API_URL = "https://tu-dominio.com/api/enviar-correo";
```

## 🔧 Estructura del Sistema

### Archivos Modificados:

1. **`premierautomotriz/server.js`**

   - Agregado soporte para JSON (`bodyParser.json()`)
   - Mantiene soporte para form-urlencoded
   - Endpoint: `POST /enviar-correo`

2. **`landing/js/form.js`**
   - Sistema completo de validación en español
   - Funciones de UI (loading, success, error)
   - Integración AJAX con el servidor
   - Validación en tiempo real

### Flujo de Datos:

```
Usuario llena formulario
    ↓
Validación del lado del cliente (JavaScript)
    ↓
Muestra loading spinner
    ↓
Envía datos al servidor Node.js (JSON)
    ↓
Servidor valida reCAPTCHA (opcional)
    ↓
Servidor envía correo con Nodemailer
    ↓
Respuesta al cliente
    ↓
Muestra mensaje de éxito/error
```

## 📧 Formato del Correo Enviado

```html
<h1>Página Premier Automotriz</h1>
<p>Nombre: [nombre del usuario]</p>
<p>Email: [email del usuario]</p>
<p>Asunto: Contacto desde sitio web - Bolsa de Trabajo</p>
<p>Teléfono: [teléfono del usuario]</p>
<p>Servicio: Bolsa de Trabajo</p>
<p>Mensaje: [mensaje del usuario]</p>
```

## 🎨 Mensajes al Usuario

### Mensaje de Loading:

```
🔄 Enviando mensaje...
Por favor espera un momento
```

### Mensaje de Éxito:

```
✓ ¡Mensaje Enviado Exitosamente!
Gracias [nombre], hemos recibido tu mensaje.
Nos pondremos en contacto contigo lo antes posible.
```

### Mensajes de Error:

- **Error de conexión:** "No se pudo conectar con el servidor. Verifica tu conexión a internet."
- **Error 400:** "Datos inválidos. Por favor verifica la información ingresada."
- **Error 500:** "Error en el servidor. Por favor intenta más tarde."
- **Timeout:** "La solicitud tardó demasiado. Por favor intenta nuevamente."

## 🔒 Configuración de Seguridad

### CORS (Cross-Origin Resource Sharing)

El servidor ya tiene CORS habilitado para todas las rutas:

```javascript
app.use(cors());
```

### Configuración SMTP Segura

```javascript
{
  host: "secure.emailsrvr.com",
  port: 465,
  secure: true,  // SSL/TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
}
```

## 🐳 Despliegue con Docker

El proyecto ya incluye Docker configurado:

```bash
# Construir imagen
docker-compose build

# Iniciar servicio
docker-compose up -d

# Ver logs
docker-compose logs -f
```

## 🧪 Pruebas

### 1. Prueba Local

1. Inicia el servidor: `npm start`
2. Abre `landing/bolsa-trabajo.html` en el navegador
3. Llena el formulario
4. Verifica la consola del navegador para ver los logs
5. Verifica la consola del servidor para ver el envío

### 2. Validación de Campos

- **Nombre vacío:** "Por favor ingresa tu nombre"
- **Nombre < 3 caracteres:** "El nombre debe tener al menos 3 caracteres"
- **Email inválido:** "Por favor ingresa un correo electrónico válido"
- **Teléfono < 10 dígitos:** "El teléfono debe tener al menos 10 dígitos"
- **Mensaje < 10 caracteres:** "El mensaje debe tener al menos 10 caracteres"

### 3. Estados del Formulario

- ✅ **Idle:** Formulario listo para usar
- 🔄 **Loading:** Botón deshabilitado, spinner visible
- ✓ **Success:** Mensaje verde, formulario limpio
- ❌ **Error:** Mensaje rojo con opciones de contacto

## 📝 Personalización

### Cambiar Destinatarios del Correo

En `server.js`, línea 68:

```javascript
to: "roberto@masoft.mx, hola@camaleonmarketingstudio.com",
```

### Cambiar Remitente del Correo

En `server.js`, línea 67:

```javascript
from: "hola@camaleonmarketingstudio.com",
```

### Cambiar Tiempo de Auto-ocultamiento

En `form.js`, línea 136:

```javascript
setTimeout(function () {
  $("#success .alert").fadeOut(500);
}, 10000); // 10 segundos (10000 ms)
```

## 🚨 Solución de Problemas

### Problema: "No se pudo conectar con el servidor"

**Solución:**

1. Verifica que el servidor Node.js esté corriendo
2. Verifica la URL del API en `form.js`
3. Verifica la configuración de CORS
4. Revisa la consola del navegador para errores de red

### Problema: "Error 500 en el servidor"

**Solución:**

1. Verifica las credenciales SMTP en `.env`
2. Revisa los logs del servidor: `docker-compose logs -f`
3. Verifica la configuración de Nodemailer

### Problema: Los correos no llegan

**Solución:**

1. Verifica el archivo `.env` con las credenciales correctas
2. Prueba las credenciales SMTP manualmente
3. Verifica que el puerto 465 esté abierto
4. Revisa la carpeta de spam del destinatario

## 📞 Soporte

Si tienes problemas, el formulario incluye un enlace de respaldo:

```
"Si el problema persiste, contáctanos directamente al 667 846 45 61"
```

## ✨ Características Futuras Sugeridas

1. **Captcha Visual:** Agregar Google reCAPTCHA v3
2. **Notificaciones por SMS:** Integrar Twilio o similar
3. **Dashboard de Mensajes:** Panel admin para ver mensajes
4. **Autorespuesta:** Email automático al usuario confirmando recepción
5. **Analytics:** Tracking de conversiones y tasa de éxito

---

**Última actualización:** Octubre 2025
**Versión:** 1.0.0
