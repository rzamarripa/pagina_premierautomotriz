#!/bin/bash

# Script de despliegue para Premier Automotriz
# Uso: ./deploy.sh

set -e  # Salir si hay errores

echo "🚀 Iniciando despliegue de Premier Automotriz..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Instálalo primero."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está instalado. Instálalo primero."
    exit 1
fi

# Verificar archivos de configuración
if [ ! -f ".env" ]; then
    print_warning "Archivo .env no encontrado. Creando desde env.example..."
    if [ -f "env.example" ]; then
        cp env.example .env
        print_warning "Por favor, edita el archivo .env con tus credenciales reales."
        print_warning "nano .env"
        exit 1
    else
        print_error "Archivo env.example no encontrado."
        exit 1
    fi
fi

if [ ! -f "premierautomotriz/.env" ]; then
    print_warning "Archivo premierautomotriz/.env no encontrado. Creando..."
    cp .env premierautomotriz/.env
fi

# Parar contenedores existentes
print_status "Parando contenedores existentes..."
docker-compose down

# Construir imágenes
print_status "Construyendo imágenes Docker..."
docker-compose build --no-cache

# Ejecutar contenedores
print_status "Iniciando contenedores..."
docker-compose up -d

# Esperar a que los servicios estén listos
print_status "Esperando a que los servicios estén listos..."
sleep 10

# Verificar que los servicios estén corriendo
print_status "Verificando servicios..."

# Verificar API
if curl -f http://localhost:3006/enviar-correo > /dev/null 2>&1; then
    print_status "✅ API funcionando en puerto 3006"
else
    print_warning "⚠️  API no responde en puerto 3006"
fi

# Verificar Landing
if curl -f http://localhost:8081 > /dev/null 2>&1; then
    print_status "✅ Landing funcionando en puerto 8081"
else
    print_warning "⚠️  Landing no responde en puerto 8081"
fi

# Mostrar estado de contenedores
print_status "Estado de contenedores:"
docker-compose ps

# Mostrar logs recientes
print_status "Logs recientes:"
docker-compose logs --tail=20

echo ""
print_status "🎉 Despliegue completado!"
echo ""
echo "📋 URLs de acceso:"
echo "   🌐 Landing: http://localhost:8081"
echo "   🔧 API: http://localhost:3006"
echo "   📝 Formulario: http://localhost:8081/bolsa-trabajo.html"
echo ""
echo "🔍 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Parar: docker-compose down"
echo "   Reiniciar: docker-compose restart"
echo "   Estado: docker-compose ps"
echo ""
print_warning "Recuerda configurar tu dominio y SSL para producción!"
