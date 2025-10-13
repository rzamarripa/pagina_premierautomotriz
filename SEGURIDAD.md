# 🔒 Seguridad y Configuración Confidencial

## ⚠️ **IMPORTANTE: Información Confidencial**

Este proyecto contiene información sensible que **NO debe** ser subida a repositorios públicos.

## 🚫 **Archivos Ignorados por Git**

El archivo `.gitignore` está configurado para ignorar:

### 📧 **Credenciales de Correo**
- `.env` - Variables de entorno principales
- `docker.env` - Configuración para Docker
- `config.env` - Configuración del servidor
- `premierautomotriz/.env` - Variables específicas del servidor

### 🔑 **Claves y Certificados**
- `*.key` - Archivos de claves privadas
- `*.pem` - Certificados
- `*.p12` - Certificados PKCS#12
- `secrets/` - Carpeta de secretos
- `credentials/` - Carpeta de credenciales

### 📝 **Logs y Archivos Temporales**
- `*.log` - Archivos de log
- `logs/` - Carpeta de logs
- `*.tmp` - Archivos temporales
- `.cache/` - Archivos de caché

## 🔧 **Configuración Requerida**

### 1. **Crear archivo `.env` en la raíz:**
```bash
cp env.example .env
```

### 2. **Configurar variables en `.env`:**
```env
EMAIL_USER=atencionclientes@bydpremier.com.mx
EMAIL_PASS=tu_contraseña_real
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret
```

### 3. **Crear archivo `.env` en `premierautomotriz/`:**
```env
EMAIL_USER=atencionclientes@bydpremier.com.mx
EMAIL_PASS=tu_contraseña_real
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret
```

## 🛡️ **Buenas Prácticas de Seguridad**

### ✅ **Hacer:**
- Usar archivos `.env` para credenciales
- Mantener `.gitignore` actualizado
- Usar variables de entorno en producción
- Rotar credenciales regularmente
- Usar HTTPS en producción

### ❌ **No hacer:**
- Subir credenciales al repositorio
- Hardcodear contraseñas en el código
- Compartir archivos `.env` por email
- Usar credenciales de producción en desarrollo

## 🔍 **Verificar Seguridad**

### Comprobar que no hay credenciales en el código:
```bash
# Buscar posibles credenciales hardcodeadas
grep -r "password\|secret\|key" --exclude-dir=node_modules .
grep -r "EMAIL_PASS\|RECAPTCHA_SECRET" --exclude-dir=node_modules .
```

### Verificar archivos ignorados:
```bash
# Ver qué archivos están siendo ignorados
git status --ignored
```

## 🚀 **Configuración para Producción**

### Variables de entorno en el servidor:
```bash
export EMAIL_USER="atencionclientes@bydpremier.com.mx"
export EMAIL_PASS="contraseña_segura"
export RECAPTCHA_SECRET_KEY="clave_secreta"
```

### Docker Compose con variables de entorno:
```yaml
environment:
  EMAIL_USER: ${EMAIL_USER}
  EMAIL_PASS: ${EMAIL_PASS}
  RECAPTCHA_SECRET_KEY: ${RECAPTCHA_SECRET_KEY}
```

## 📋 **Checklist de Seguridad**

- [ ] Archivo `.gitignore` configurado
- [ ] Archivo `.env` creado (no en git)
- [ ] Credenciales no hardcodeadas
- [ ] Variables de entorno configuradas
- [ ] HTTPS configurado en producción
- [ ] Logs no contienen credenciales
- [ ] Archivos de backup seguros

## 🆘 **En caso de compromiso**

1. **Cambiar todas las credenciales inmediatamente**
2. **Revisar logs de acceso**
3. **Actualizar claves de reCAPTCHA**
4. **Notificar al equipo de seguridad**

## 📞 **Contacto de Seguridad**

Para reportar vulnerabilidades o problemas de seguridad:
- Email: seguridad@premierautomotriz.com
- Teléfono: 667 846 45 61

---

**🔒 Recuerda: La seguridad es responsabilidad de todos**
