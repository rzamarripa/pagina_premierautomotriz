# 🚀 Inicio Rápido - Sistema de Formulario

## ⚡ 3 Pasos para Activar el Formulario

### 📝 Paso 1: Configurar Variables de Entorno

Crea el archivo `.env` en `premierautomotriz/.env`:

```bash
cd premierautomotriz
```

```env
EMAIL_USER=tu_correo@dominio.com
EMAIL_PASS=tu_contraseña
RECAPTCHA_SECRET_KEY=opcional
```

### ✅ Paso 2: Probar la Conexión de Correo

```bash
npm test
```

**Deberías ver:**

```
✅ Conexión SMTP exitosa
📧 Servidor listo para enviar correos
📤 Enviando correo de prueba...
✅ Correo enviado exitosamente!
```

### 🚀 Paso 3: Iniciar el Servidor

```bash
npm start
```

**Deberías ver:**

```
Servidor iniciado en http://localhost:3000
```

---

## 🎯 ¿Todo Funcionó?

### ✅ Checklist de Verificación:

- [ ] Archivo `.env` creado con credenciales
- [ ] `npm test` muestra "✅ Correo enviado exitosamente"
- [ ] Servidor corriendo en `http://localhost:3000`
- [ ] Recibiste el correo de prueba
- [ ] Formulario carga sin errores en el navegador
- [ ] Al enviar formulario aparece el loading
- [ ] Mensaje de éxito aparece después del envío
- [ ] Correo llega a la bandeja

---

## 📧 Actualizar URL del Servidor

### Para Desarrollo Local:

En `landing/js/form.js` línea 5:

```javascript
const API_URL = "http://localhost:3000/enviar-correo";
```

### Para Producción:

```javascript
const API_URL = "https://premierautomotriz.com/api/enviar-correo";
```

---

## 🎨 El Formulario en Acción

### 1️⃣ Usuario llena el formulario

```
Nombre: Juan Pérez
Email: juan@ejemplo.com
Teléfono: 6671234567
Mensaje: Me interesa trabajar con ustedes
```

### 2️⃣ Click en "Enviar"

```
🔄 Loading aparece
🔄 Botón cambia a "Enviando..."
🔄 Campos se deshabilitan
```

### 3️⃣ Mensaje de Éxito

```
✓ ¡Mensaje Enviado Exitosamente!
Gracias Juan, hemos recibido tu mensaje.
Nos pondremos en contacto contigo lo antes posible.
```

### 4️⃣ Correo Recibido

```
De: hola@camaleonmarketingstudio.com
Para: roberto@masoft.mx, hola@camaleonmarketingstudio.com
Asunto: Página Premier Automotriz: Juan Pérez - Contacto desde sitio web

Nombre: Juan Pérez
Email: juan@ejemplo.com
Teléfono: 6671234567
Servicio: Bolsa de Trabajo
Mensaje: Me interesa trabajar con ustedes
```

---

## 🐛 Solución Rápida de Problemas

### ❌ "npm: command not found"

```bash
# Instala Node.js primero
# Descarga desde: https://nodejs.org/
```

### ❌ "Error de conexión SMTP"

```bash
# Verifica tus credenciales en .env
cat .env

# Prueba de nuevo
npm test
```

### ❌ "Error: Cannot find module"

```bash
# Instala las dependencias
npm install
```

### ❌ "Port 3000 already in use"

```bash
# Usa otro puerto o mata el proceso
lsof -ti:3000 | xargs kill
```

### ❌ Formulario no envía

1. ✅ Verifica que el servidor esté corriendo (`npm start`)
2. ✅ Abre consola del navegador (F12)
3. ✅ Busca errores en la pestaña "Console"
4. ✅ Verifica la URL del API en `form.js`

---

## 📊 Scripts Disponibles

```bash
npm start         # Inicia el servidor en producción
npm run dev       # Inicia con nodemon (reinicio automático)
npm test          # Prueba el envío de correos
npm test:email    # Alias de npm test
```

---

## 🎯 Próximos Pasos

Después de que todo funcione:

1. **Actualizar destinatarios del correo:**

   - Edita `server.js` línea 68

2. **Personalizar mensajes:**

   - Edita `landing/js/form.js`

3. **Configurar dominio en producción:**

   - Actualiza `API_URL` en `form.js`
   - Configura CORS en `server.js` si es necesario

4. **Agregar más validaciones:**

   - Modifica función `validateForm()` en `form.js`

5. **Mejorar diseño:**
   - Personaliza mensajes en funciones `showSuccessMessage()` y `showErrorMessage()`

---

## 📚 Documentación Completa

Para configuración avanzada, consulta:

- 📄 `CONFIGURACION_FORMULARIO.md` - Guía completa
- 📄 `README_FORMULARIO.md` - Referencia rápida

---

## 🆘 Soporte

¿Problemas? Revisa:

1. Logs del servidor: `console` donde corre `npm start`
2. Logs del navegador: Consola (F12)
3. Correos en spam
4. Configuración de firewall/puertos

**¡Tu formulario está listo para recibir mensajes! 🎉**
