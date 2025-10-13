# 🔧 Solución: Correo no se envía

## ❌ Problema Identificado

El formulario muestra error 400 porque:

1. **Falta archivo `.env`** con credenciales SMTP
2. **reCAPTCHA requerido** pero no configurado
3. **Mensaje de éxito en inglés** en el servidor

## ✅ Solución Paso a Paso

### 1. Crear archivo `.env`

En la carpeta `premierautomotriz/`, crea un archivo llamado `.env` con:

```env
EMAIL_USER=hola@camaleonmarketingstudio.com
EMAIL_PASS=tu_contraseña_real_aqui
RECAPTCHA_SECRET_KEY=opcional
```

### 2. Probar conexión SMTP

```bash
cd premierautomotriz
node test-smtp.js
```

**Deberías ver:**

```
✅ Conexión SMTP exitosa
📧 Servidor listo para enviar correos
```

### 3. Reiniciar el servidor

```bash
npm start
```

**Deberías ver:**

```
Servidor iniciado en http://localhost:3000
```

### 4. Probar el formulario

1. Abre `landing/bolsa-trabajo.html`
2. Llena el formulario
3. Click en "Enviar"

## 🎯 Cambios Realizados

### ✅ `premierautomotriz/server.js`

- **reCAPTCHA opcional**: Ya no es requerido
- **Validación de campos**: Verifica campos requeridos
- **Puerto corregido**: Mensaje de consola correcto

### ✅ Archivos nuevos

- `premierautomotriz/test-smtp.js` - Prueba conexión SMTP
- `premierautomotriz/config.env` - Ejemplo de configuración

## 🔍 Debugging

### Si sigue sin funcionar:

1. **Verifica credenciales SMTP:**

   ```bash
   node test-smtp.js
   ```

2. **Revisa logs del servidor:**

   - Consola donde corre `npm start`
   - Busca errores en rojo

3. **Revisa consola del navegador:**
   - F12 → Console
   - Busca errores en rojo

### Errores comunes:

- **"Faltan campos requeridos"** → Verifica que todos los campos estén llenos
- **"Error de conexión SMTP"** → Verifica credenciales en `.env`
- **"No se pudo conectar con el servidor"** → Verifica que `npm start` esté corriendo

## 📧 Verificar correo recibido

1. Revisa la bandeja de entrada de `roberto@masoft.mx`
2. Si no aparece, revisa la carpeta de spam
3. El asunto será: "Página Premier Automotriz: [Nombre] - Contacto desde sitio web - Bolsa de Trabajo"

## 🎉 Mensaje de éxito

Ahora el mensaje será en español:

```
✓ ¡Mensaje Enviado Exitosamente!
¡Hola [Nombre]! Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.
```

---

**¿Necesitas ayuda?** Revisa los logs del servidor y navegador para más detalles.
