# 🔧 Solución: Error Docker Compose

## ❌ **Error Encontrado**

```
failed to solve: failed to read dockerfile: open Dockerfile: no such file or directory
```

## ✅ **Solución Implementada**

### **Archivos Creados:**

1. **`landing/Dockerfile`** - Dockerfile para el servicio landing
2. **`landing/nginx.conf`** - Configuración de Nginx optimizada
3. **`landing/.dockerignore`** - Archivos a ignorar en el build
4. **`docker-compose.yml`** - Removida versión obsoleta

## 🚀 **Comandos para Ejecutar en el Servidor**

### **1. Subir los archivos nuevos:**

```bash
# Subir archivos al servidor
scp landing/Dockerfile usuario@servidor:/opt/docker/pagina_premierautomotriz/landing/
scp landing/nginx.conf usuario@servidor:/opt/docker/pagina_premierautomotriz/landing/
scp landing/.dockerignore usuario@servidor:/opt/docker/pagina_premierautomotriz/landing/
scp docker-compose.yml usuario@servidor:/opt/docker/pagina_premierautomotriz/
```

### **2. O crear los archivos directamente en el servidor:**

```bash
# Crear Dockerfile para landing
cat > landing/Dockerfile << 'EOF'
# Dockerfile para el servicio landing (Nginx)
FROM nginx:alpine

# Copiar archivos del landing
COPY . /usr/share/nginx/html/

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
EOF

# Crear configuración de Nginx
cat > landing/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Configuración de logs
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log;

    # Configuración de rendimiento
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Compresión
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html index.htm;

        # Configuración de seguridad
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

        # Configuración de archivos estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Configuración para archivos HTML
        location ~* \.html$ {
            expires 1h;
            add_header Cache-Control "public";
        }

        # Configuración principal
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Configuración para archivos de fuentes
        location ~* \.(woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header Access-Control-Allow-Origin "*";
        }

        # Configuración de error pages
        error_page 404 /index.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
EOF

# Crear .dockerignore
cat > landing/.dockerignore << 'EOF'
# Archivos a ignorar en el build de Docker
.git
.gitignore
README.md
*.md
.env
.env.*
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
Thumbs.db
EOF
```

### **3. Actualizar docker-compose.yml:**

```bash
# Remover la línea de versión obsoleta
sed -i '1d' docker-compose.yml
```

### **4. Ejecutar Docker Compose:**

```bash
# Limpiar contenedores anteriores
sudo docker compose down

# Construir y ejecutar
sudo docker compose up -d --build

# Ver logs
sudo docker compose logs -f
```

## 🔍 **Verificación**

```bash
# Verificar contenedores
sudo docker compose ps

# Verificar puertos
sudo netstat -tlnp | grep -E ":(3006|8081)"

# Probar servicios
curl http://localhost:3006
curl http://localhost:8081
```

## 📋 **Estructura de Archivos Requerida**

```
/opt/docker/pagina_premierautomotriz/
├── docker-compose.yml
├── .env
├── premierautomotriz/
│   ├── Dockerfile
│   ├── .env
│   ├── server.js
│   └── package.json
└── landing/
    ├── Dockerfile          # ← NUEVO
    ├── nginx.conf          # ← NUEVO
    ├── .dockerignore       # ← NUEVO
    ├── index.html
    └── js/
        └── form.js
```

## 🎯 **Resultado Esperado**

Después de ejecutar los comandos, deberías ver:

```
NAME                                    COMMAND                  SERVICE             STATUS              PORTS
pagina_premierautomotriz-landing-1      "/docker-entrypoint.…"   landing             Up                  0.0.0.0:8081->80/tcp
pagina_premierautomotriz-premierautomotriz-1   "docker-entrypoint.s…"   premierautomotriz   Up                  0.0.0.0:3006->3000/tcp
```

---

**🎉 ¡Ahora Docker Compose debería funcionar correctamente!**
