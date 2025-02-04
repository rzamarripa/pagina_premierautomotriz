# Usa la imagen base de Nginx
FROM nginx:alpine

# Copia el contenido de tu directorio actual al directorio de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80 para el tráfico HTTP
EXPOSE 80