# 🚀 Guía de Despliegue - Premier Automotriz

## 📋 **Requisitos del Servidor**

### **Especificaciones Mínimas:**

- **CPU**: 1 vCPU
- **RAM**: 1GB
- **Disco**: 10GB
- **OS**: Ubuntu 20.04+ / CentOS 7+ / Debian 10+

### **Puertos Requeridos:**

- `3006` - API del servidor
- `8081` - Landing page
- `22` - SSH
- `80` - HTTP (para Nginx)
- `443` - HTTPS (para SSL)

## 🔧 **Instalación en el Servidor**

### 1️⃣ **Preparar el Servidor**

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependencias
sudo apt install curl wget git -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

### 2️⃣ **Subir el Código**

```bash
# Opción A: Clonar desde Git
git clone https://github.com/tu-usuario/pagina_premierautomotriz.git
cd pagina_premierautomotriz

# Opción B: Subir archivos
scp -r . usuario@servidor:/ruta/del/proyecto/
```

### 3️⃣ **Configurar Variables de Entorno**

```bash
# Crear archivo .env en la raíz
nano .env
```

**Contenido:**

```env
EMAIL_USER=atencionclientes@bydpremier.com.mx
EMAIL_PASS=ByDCLN24
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key
PREMIER_PORT=3006
LANDING_PORT=8081
```

```bash
# Crear archivo .env en premierautomotriz/
nano premierautomotriz/.env
```

**Contenido:**

```env
EMAIL_USER=atencionclientes@bydpremier.com.mx
EMAIL_PASS=ByDCLN24
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key
```

### 4️⃣ **Configurar Firewall**

```bash
# Abrir puertos necesarios
sudo ufw allow 3006/tcp
sudo ufw allow 8081/tcp
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 🚀 **Despliegue Automático**

### **Usar el Script de Despliegue:**

```bash
# Ejecutar script de despliegue
./deploy.sh
```

**El script automáticamente:**

- ✅ Verifica dependencias
- ✅ Crea archivos de configuración
- ✅ Para contenedores existentes
- ✅ Construye imágenes Docker
- ✅ Inicia servicios
- ✅ Verifica funcionamiento
- ✅ Muestra URLs de acceso

### **Despliegue Manual:**

```bash
# Construir imágenes
docker-compose build

# Ejecutar en segundo plano
docker-compose up -d

# Verificar estado
docker-compose ps

# Ver logs
docker-compose logs -f
```

## 🌐 **Configurar Dominio y SSL**

### 1️⃣ **Instalar Nginx**

```bash
sudo apt install nginx -y
```

### 2️⃣ **Configurar Nginx**

```bash
sudo nano /etc/nginx/sites-available/premierautomotriz
```

**Configuración:**

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    # Landing page
    location / {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API
    location /api/ {
        proxy_pass http://localhost:3006/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activar configuración
sudo ln -s /etc/nginx/sites-available/premierautomotriz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3️⃣ **Configurar SSL**

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

## 🔍 **Verificación del Despliegue**

### **Comandos de Verificación:**

```bash
# Verificar contenedores
docker-compose ps

# Verificar API
curl http://localhost:3006/enviar-correo

# Verificar Landing
curl http://localhost:8081

# Verificar logs
docker-compose logs -f

# Verificar puertos
netstat -tlnp | grep -E ":(3006|8081|80|443)"
```

### **URLs de Acceso:**

- **Landing**: http://tu-dominio.com
- **API**: http://tu-dominio.com/api/
- **Formulario**: http://tu-dominio.com/bolsa-trabajo.html
- **HTTPS**: https://tu-dominio.com

## 🛠️ **Mantenimiento**

### **Comandos Útiles:**

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar servicios
docker-compose restart

# Parar servicios
docker-compose down

# Actualizar y redesplegar
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Ver uso de recursos
docker stats

# Limpiar imágenes no usadas
docker system prune -a
```

### **Monitoreo:**

```bash
# Verificar estado de servicios
systemctl status nginx
docker-compose ps

# Verificar logs de Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Verificar uso de disco
df -h

# Verificar memoria
free -h
```

## 🚨 **Solución de Problemas**

### **Problemas Comunes:**

1. **Puerto ocupado:**

   ```bash
   sudo lsof -i :3006
   sudo kill -9 PID
   ```

2. **Contenedor no inicia:**

   ```bash
   docker-compose logs nombre-del-servicio
   ```

3. **Error de permisos:**

   ```bash
   sudo chown -R $USER:$USER .
   ```

4. **Error de memoria:**
   ```bash
   # Aumentar swap
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

## 📊 **Monitoreo y Logs**

### **Configurar Logs Persistentes:**

```bash
# Crear directorio de logs
mkdir -p logs

# Configurar rotación de logs
sudo nano /etc/logrotate.d/premierautomotriz
```

**Configuración de logrotate:**

```
/var/log/premierautomotriz/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root root
}
```

## 🔒 **Seguridad Adicional**

### **Configuraciones de Seguridad:**

```bash
# Configurar fail2ban
sudo apt install fail2ban -y

# Configurar firewall avanzado
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Configurar actualizaciones automáticas
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

**🎉 ¡Tu aplicación Premier Automotriz estará funcionando en producción!**
