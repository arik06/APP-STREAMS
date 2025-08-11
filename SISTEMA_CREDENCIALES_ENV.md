# 🔐 SISTEMA DE CREDENCIALES CON VARIABLES DE ENTORNO

## 🎯 **¿POR QUÉ VARIABLES DE ENTORNO?**

**✅ VENTAJAS:**
- **Más seguro** - No se sube a repositorios
- **Estándar de la industria** - Práctica recomendada
- **Fácil de cambiar** - Sin tocar código
- **Separación de configuraciones** - Dev vs Producción

## 🚀 **CONFIGURACIÓN RÁPIDA:**

### **Paso 1: Ejecutar el configurador**
```bash
cd backend
npm run setup-env
```

### **Paso 2: Ingresar credenciales**
El script te pedirá para cada servicio:
- **Email** del servicio
- **Contraseña** del servicio  
- **Fecha de expiración** (opcional)

### **Paso 3: Reiniciar servidor**
```bash
npm run dev
```

## 📝 **ESTRUCTURA DEL ARCHIVO .ENV:**

```bash
# 🔐 CREDENCIALES DE SERVICIOS DE STREAMING

# JWT Secret
JWT_SECRET=tu-secreto-jwt-super-seguro

# 🎬 PRIME VIDEO
PRIME_EMAIL=tu-email-prime@gmail.com
PRIME_PASSWORD=tu-contraseña-prime
PRIME_END_DATE=2024-12-31

# 🎬 DISNEY+
DISNEY_EMAIL=tu-email-disney@gmail.com
DISNEY_PASSWORD=tu-contraseña-disney
DISNEY_END_DATE=2024-12-31

# 🎬 HBO MAX
HBO_EMAIL=tu-email-hbo@gmail.com
HBO_PASSWORD=tu-contraseña-hbo
HBO_END_DATE=2024-12-31

# 🎬 PARAMOUNT+
PARAMOUNT_EMAIL=tu-email-paramount@gmail.com
PARAMOUNT_PASSWORD=tu-contraseña-paramount
PARAMOUNT_END_DATE=2024-12-31

# 🎬 CRUNCHYROLL
CRUNCHYROLL_EMAIL=tu-email-crunchyroll@gmail.com
CRUNCHYROLL_PASSWORD=tu-contraseña-crunchyroll
CRUNCHYROLL_END_DATE=2024-12-31

# 🎬 NETFLIX
NETFLIX_EMAIL=tu-email-netflix@gmail.com
NETFLIX_PASSWORD=tu-contraseña-netflix
NETFLIX_END_DATE=2024-12-31
```

## 🔒 **SEGURIDAD:**

### **✅ LO QUE ESTÁ PROTEGIDO:**
- **Archivo .env** no se sube a repositorios (está en .gitignore)
- **Autenticación JWT** requerida para acceder
- **Base de datos local** (no expuesta a internet)
- **Variables de entorno** separadas del código

### **⚠️ IMPORTANTE:**
- **NO subir** el archivo .env a repositorios públicos
- **Mantener privado** el archivo .env
- **Usar HTTPS** en producción
- **Backup seguro** de las credenciales

## 📱 **INTERFAZ DEL USUARIO:**

### **¿Se muestran las contraseñas?**
**¡SÍ!** Las contraseñas se muestran en la interfaz web porque:
- El usuario necesita verlas para acceder a los servicios
- Solo usuarios autenticados pueden verlas
- Es el propósito principal de la aplicación

### **Flujo de visualización:**
1. **Usuario inicia sesión** → Autenticación JWT
2. **Ve lista de servicios** → Solo nombres e imágenes
3. **Hace clic en servicio** → Modal muestra credenciales completas
4. **Credenciales visibles** → Email, contraseña, fecha de expiración

## 🛠️ **COMANDOS DISPONIBLES:**

```bash
# Configurar variables de entorno (RECOMENDADO)
npm run setup-env

# Verificar estado de la base de datos
npm run check-db

# Iniciar servidor
npm run dev

# Crear usuario
npm run create-user
```

## 🔄 **ACTUALIZACIÓN AUTOMÁTICA:**

- **Al reiniciar el servidor** se aplican los cambios del .env
- **Base de datos se limpia** y se reinsertan los servicios
- **Nuevas credenciales** se cargan desde las variables de entorno
- **No hay duplicados** - siempre 6 servicios únicos

## 💡 **EJEMPLOS DE USO:**

### **Configurar Netflix:**
```bash
NETFLIX_EMAIL=miemail@gmail.com
NETFLIX_PASSWORD=mi-contraseña-secreta
NETFLIX_END_DATE=2024-12-31
```

### **Configurar Disney+:**
```bash
DISNEY_EMAIL=otro-email@hotmail.com
DISNEY_PASSWORD=otra-contraseña
DISNEY_END_DATE=2025-01-15
```

## 🎉 **RESULTADO FINAL:**

Tu aplicación ahora:
- ✅ **Usa variables de entorno** (más seguro)
- ✅ **Almacena credenciales** en base de datos
- ✅ **Muestra contraseñas** en la interfaz web
- ✅ **Se actualiza automáticamente** al cambiar .env
- ✅ **Mantiene seguridad** con autenticación JWT
- ✅ **Sigue estándares** de la industria

## 🚨 **IMPORTANTE - PASOS FINALES:**

1. **Ejecuta:** `npm run setup-env`
2. **Ingresa** tus credenciales reales
3. **Reinicia** el servidor: `npm run dev`
4. **Verifica** que funcionen: `npm run check-db`

**¡Tu sistema de credenciales está listo y es súper seguro!** 🔐✨
