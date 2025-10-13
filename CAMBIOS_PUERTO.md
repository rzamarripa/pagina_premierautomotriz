# 🔧 Cambios de Puerto - 3006 Externo

## ✅ **Cambios Realizados**

### 1. `docker-compose.yml`

```yaml
ports:
  - "3006:3000" # Externo:3006, Interno:3000
```

### 2. `landing/js/form.js`

```javascript
const API_URL = "http://localhost:3006/enviar-correo";
```

### 3. `docker.env`

```env
PREMIER_PORT=3006
```

### 4. `DOCKER_SETUP.md`

- Actualizadas todas las referencias al puerto 3006

## 🌐 **URLs Actualizadas**

- **API Server**: http://localhost:3006
- **Landing Page**: http://localhost:8081
- **Formulario**: http://localhost:8081/bolsa-trabajo.html

## 🚀 **Para usar con Docker Compose**

```bash
# Construir y ejecutar
docker-compose up -d

# Verificar servicios
docker-compose ps

# Probar API
curl http://localhost:3006/enviar-correo
```

## 🔍 **Verificación**

1. **Servidor corriendo**: http://localhost:3006
2. **Formulario funcional**: http://localhost:8081/bolsa-trabajo.html
3. **API respondiendo**: `curl http://localhost:3006/enviar-correo`

## 📝 **Notas**

- **Puerto interno**: 3000 (dentro del contenedor)
- **Puerto externo**: 3006 (accesible desde el host)
- **Formulario**: Configurado para usar puerto 3006
- **Docker**: Mapea 3006:3000 correctamente

---

**✅ Listo para producción en puerto 3006**
