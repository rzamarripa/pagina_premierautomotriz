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
