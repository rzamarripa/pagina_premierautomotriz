#!/bin/bash

# Script para arreglar errores en el servidor de producción
# Ejecutar en el servidor: sudo bash deploy-fix.sh

echo "🔧 Arreglando errores en el servidor de producción..."

# 1. Parar todos los contenedores
echo "📦 Parando contenedores..."
sudo docker compose down --remove-orphans

# 2. Limpiar contenedores problemáticos
echo "🧹 Limpiando contenedores problemáticos..."
sudo docker rm -f pagina_premierautomotriz-landing-1 2>/dev/null || true
sudo docker rm -f pagina_premierautomotriz-web-1 2>/dev/null || true

# 3. Limpiar imágenes no usadas
echo "🗑️ Limpiando imágenes no usadas..."
sudo docker system prune -f

# 4. Verificar archivos necesarios
echo "📁 Verificando archivos necesarios..."
if [ ! -f "landing/Dockerfile" ]; then
    echo "Creando landing/Dockerfile..."
    cat > landing/Dockerfile << 'EOF'
FROM nginx:alpine
COPY . /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
fi

if [ ! -f "landing/nginx.conf" ]; then
    echo "Creando landing/nginx.conf..."
    cat > landing/nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html index.htm;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
EOF
fi

# 5. Crear directorio de favicon
echo "📁 Creando directorio de favicon..."
mkdir -p landing/img/favicon

# 6. Copiar favicon si no existe
if [ ! -f "landing/img/favicon/favicon.ico" ]; then
    echo "📄 Creando favicon..."
    cp landing/img/isotipo.png landing/img/favicon/favicon.ico 2>/dev/null || echo "⚠️ No se pudo crear favicon"
fi

# 7. Remover versión obsoleta del docker-compose.yml
echo "📝 Limpiando docker-compose.yml..."
sed -i '1d' docker-compose.yml 2>/dev/null || true

# 8. Construir y ejecutar
echo "🚀 Construyendo y ejecutando contenedores..."
sudo docker compose up -d --build --force-recreate

# 9. Verificar estado
echo "✅ Verificando estado de los contenedores..."
sudo docker compose ps

# 10. Mostrar logs
echo "📋 Mostrando logs..."
sudo docker compose logs --tail=20

echo ""
echo "🎉 ¡Despliegue completado!"
echo ""
echo "🌐 Aplicación disponible en:"
echo "   - Frontend: http://localhost:8081"
echo "   - Backend: http://localhost:3006"
echo ""
echo "📊 Para ver logs en tiempo real:"
echo "   sudo docker compose logs -f"
echo ""
echo "🔄 Para reiniciar:"
echo "   sudo docker compose restart"
echo ""
echo "⚠️  NOTA IMPORTANTE:"
echo "   Los errores de YouTube CORS y Google Play 401 son normales"
echo "   y NO afectan el funcionamiento de la página."
echo "   Ver SOLUCION_ERRORES_CONSOLA.md para más información."
echo ""
