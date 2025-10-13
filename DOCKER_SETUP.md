# 🐳 Docker Compose - Configuración Actualizada

## ✅ **Cambios Realizados**

### `docker-compose.yml` actualizado:

1. **Puerto configurado**: `3006:3000` (externo:3006, interno:3000)
2. **Variables de entorno seguras**: Usa `${EMAIL_USER:-default}`
3. **Archivo .env**: Carga desde `./premierautomotriz/.env`
4. **Red personalizada**: `premier-network` para comunicación entre servicios
5. **Dependencias**: `landing` depende de `premierautomotriz`
6. **Restart policy**: `unless-stopped` para mayor estabilidad

## 🚀 **Cómo usar Docker Compose**

### 1. Crear archivo `.env` en la raíz:

```bash
# Copia docker.env como .env
cp docker.env .env
```

### 2. Crear archivo `.env` en premierautomotriz/:

```bash
# En premierautomotriz/.env
EMAIL_USER=atencionclientes@bydpremier.com.mx
EMAIL_PASS=ByDCLN24
RECAPTCHA_SECRET_KEY=
```

### 3. Construir y ejecutar:

```bash
# Construir imágenes
docker-compose build

# Ejecutar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### 4. Verificar servicios:

```bash
# Ver servicios corriendo
docker-compose ps

# Probar API
curl http://localhost:3006/enviar-correo
```

## 🔧 **Comandos útiles**

```bash
# Parar servicios
docker-compose down

# Reconstruir y ejecutar
docker-compose up --build -d

# Ver logs específicos
docker-compose logs -f premierautomotriz
docker-compose logs -f landing

# Entrar al contenedor
docker-compose exec premierautomotriz sh
```

## 🌐 **URLs de acceso**

- **Landing Page**: http://localhost:8081
- **API Server**: http://localhost:3006
- **Formulario**: http://localhost:8081/bolsa-trabajo.html

## 🔍 **Troubleshooting**

### Si el puerto 3000 está ocupado:

```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Usar puerto 3001 en lugar de 3000
```

### Si hay problemas de red:

```bash
# Verificar red
docker network ls
docker network inspect premierautomotriz_premier-network
```

### Si el formulario no se conecta:

1. Verifica que ambos servicios estén corriendo:

   ```bash
   docker-compose ps
   ```

2. Verifica logs del servidor:

   ```bash
   docker-compose logs premierautomotriz
   ```

3. Actualiza la URL en `landing/js/form.js`:
   ```javascript
   const API_URL = "http://localhost:3006/enviar-correo";
   ```

## 📧 **Configuración de correo**

El servidor está configurado para usar:

- **Host**: `secure.emailsrvr.com`
- **Puerto**: `465` (SSL)
- **Usuario**: `atencionclientes@bydpremier.com.mx`

## 🎯 **Próximos pasos**

1. ✅ Crear archivo `.env` en la raíz
2. ✅ Crear archivo `.env` en `premierautomotriz/`
3. ✅ Ejecutar `docker-compose up -d`
4. ✅ Probar formulario en http://localhost:8081/bolsa-trabajo.html

---

**¿Problemas?** Revisa los logs con `docker-compose logs -f`
