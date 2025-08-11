# 🚀 Guía de Despliegue - AppFamilia

## 📋 Requisitos Previos

- Cuenta en [GitHub](https://github.com)
- Cuenta en [Vercel](https://vercel.com) (gratis)
- Cuenta en [Railway](https://railway.app) (gratis)

## 🔧 Paso 1: Desplegar el Backend en Railway

### 1.1 Subir el código a GitHub
```bash
git add .
git commit -m "Preparar para despliegue"
git push origin main
```

### 1.2 Conectar con Railway
1. Ve a [Railway.app](https://railway.app)
2. Haz clic en "Start a New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu cuenta de GitHub
5. Selecciona tu repositorio
6. Selecciona la carpeta `backend`

### 1.3 Configurar Variables de Entorno
En Railway, agrega estas variables:
```
JWT_SECRET=tu_secreto_super_seguro_aqui
NODE_ENV=production
```

### 1.4 Obtener la URL del Backend
Railway te dará una URL como: `https://tu-app.railway.app`

## 🌐 Paso 2: Desplegar el Frontend en Vercel

### 2.1 Actualizar la URL del Backend
1. Edita `frontend/vercel.json`
2. Cambia `https://tu-backend.railway.app` por tu URL real de Railway

### 2.2 Conectar con Vercel
1. Ve a [Vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Importa tu repositorio de GitHub
4. Selecciona la carpeta `frontend`
5. Configura:
   - Framework Preset: Next.js
   - Root Directory: `frontend`

### 2.3 Configurar Variables de Entorno
En Vercel, agrega:
```
NEXT_PUBLIC_API_URL=https://tu-app.railway.app
```

## 🎯 Paso 3: Crear Usuarios en Producción

### 3.1 Acceder a la consola de Railway
1. Ve a tu proyecto en Railway
2. Haz clic en "Deployments"
3. Selecciona el deployment activo
4. Haz clic en "View Logs"

### 3.2 Ejecutar el script de creación de usuarios
```bash
# En la consola de Railway
npm run create-user
```

## ✅ Paso 4: Verificar el Despliegue

1. **Frontend**: Tu app estará en `https://tu-app.vercel.app`
2. **Backend**: API en `https://tu-app.railway.app`
3. **Prueba el login** con las credenciales que creaste

## 🔒 Seguridad en Producción

- ✅ JWT_SECRET debe ser muy largo y complejo
- ✅ HTTPS automático en Vercel y Railway
- ✅ CORS configurado para tu dominio de Vercel
- ✅ Base de datos SQLite persistente en Railway

## 💰 Costos

- **Vercel**: Gratis (hasta 100GB de ancho de banda)
- **Railway**: Gratis (hasta $5 de crédito mensual)
- **Total**: $0 por mes

## 🆘 Solución de Problemas

### Error de CORS
Si tienes problemas de CORS, agrega tu dominio de Vercel en Railway.

### Base de datos no persiste
Railway puede reiniciar el contenedor. Considera usar PostgreSQL para producción.

### Variables de entorno no funcionan
Verifica que estén configuradas en ambas plataformas.
