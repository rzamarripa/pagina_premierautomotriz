# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "server.js"]