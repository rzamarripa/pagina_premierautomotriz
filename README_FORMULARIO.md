# 📋 Guía Rápida del Formulario de Contacto

## 🎯 ¿Qué se implementó?

✅ **Sistema completo de formulario con:**

- Validación de todos los campos en español
- Loading spinner mientras se envía
- Mensajes de éxito/error profesionales
- Integración con servidor Node.js
- Envío de correos electrónicos

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `premierautomotriz/`:

```env
EMAIL_USER=tu_correo@dominio.com
EMAIL_PASS=tu_contraseña
RECAPTCHA_SECRET_KEY=opcional
```

### 2. Iniciar el Servidor

```bash
cd premierautomotriz
npm install
npm start
```

### 3. Actualizar URL del API

En `landing/js/form.js`, línea 5:

```javascript
// Para desarrollo
const API_URL = "http://localhost:3000/enviar-correo";

// Para producción
const API_URL = "https://tu-dominio.com/api/enviar-correo";
```

## 📝 Validaciones Implementadas

| Campo        | Validación           | Mensaje de Error                                 |
| ------------ | -------------------- | ------------------------------------------------ |
| **Nombre**   | Mínimo 3 caracteres  | "Por favor ingresa tu nombre"                    |
| **Email**    | Formato válido       | "Por favor ingresa un correo electrónico válido" |
| **Teléfono** | Mínimo 10 dígitos    | "El teléfono debe tener al menos 10 dígitos"     |
| **Mensaje**  | Mínimo 10 caracteres | "Por favor ingresa tu mensaje"                   |

## 🎨 Estados del Formulario

### 1. Loading (Enviando)

```
🔄 Enviando mensaje...
Por favor espera un momento
[Botón deshabilitado: "Enviando..."]
```

### 2. Éxito

```
✓ ¡Mensaje Enviado Exitosamente!
Gracias [Nombre], hemos recibido tu mensaje.
Nos pondremos en contacto contigo lo antes posible.
[Formulario limpio]
```

### 3. Error

```
⚠ Error al Enviar el Mensaje
[Descripción del error]
Si el problema persiste, contáctanos al 667 846 45 61
```

## 🔧 Archivos Modificados

### 1. `premierautomotriz/server.js`

- ✅ Agregado `bodyParser.json()`
- ✅ Soporte para JSON y form-urlencoded
- ✅ Endpoint: `POST /enviar-correo`

### 2. `landing/js/form.js`

- ✅ Sistema de validación completo
- ✅ Funciones de UI (loading, success, error)
- ✅ Integración AJAX
- ✅ Validación en tiempo real

## 📧 Formato del Correo

**Asunto:** `Página Premier Automotriz: [Nombre] - Contacto desde sitio web - Bolsa de Trabajo`

**Cuerpo:**

```
Nombre: [nombre]
Email: [email]
Teléfono: [teléfono]
Servicio: Bolsa de Trabajo
Mensaje: [mensaje]
```

**Destinatarios:** `roberto@masoft.mx, hola@camaleonmarketingstudio.com`

## 🧪 Cómo Probar

1. **Inicia el servidor:**

   ```bash
   cd premierautomotriz
   npm start
   ```

2. **Abre el formulario:**

   - Navega a `landing/bolsa-trabajo.html`

3. **Prueba validaciones:**

   - Deja campos vacíos → Ver errores
   - Email inválido → Ver error específico
   - Teléfono corto → Ver error

4. **Prueba envío:**
   - Llena todos los campos correctamente
   - Click en "Enviar"
   - Ver loading spinner
   - Ver mensaje de éxito
   - Verificar correo en la bandeja

## 🐛 Solución de Problemas

### "No se pudo conectar con el servidor"

- ✅ Verifica que `npm start` esté corriendo
- ✅ Verifica la URL en `form.js`
- ✅ Revisa la consola del navegador

### "Error 500 en el servidor"

- ✅ Verifica credenciales en `.env`
- ✅ Revisa logs: `docker-compose logs -f`
- ✅ Verifica configuración SMTP

### Los correos no llegan

- ✅ Verifica `.env` con credenciales correctas
- ✅ Revisa carpeta de spam
- ✅ Verifica puerto 465 abierto

## 📞 Contacto de Respaldo

El formulario incluye enlace telefónico en caso de error:

```
contáctanos directamente al 667 846 45 61
```

## ✨ Próximas Mejoras Sugeridas

1. ⭐ Google reCAPTCHA v3
2. ⭐ Notificaciones por SMS
3. ⭐ Dashboard de mensajes
4. ⭐ Autorespuesta al usuario
5. ⭐ Analytics y tracking

---

**¿Necesitas ayuda?** Revisa `CONFIGURACION_FORMULARIO.md` para más detalles.
