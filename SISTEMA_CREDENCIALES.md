# 🔐 SISTEMA DE CREDENCIALES DE SERVICIOS

## 📧 **¿DÓNDE VAN LAS CREDENCIALES?**

**SÍ, las credenciales (emails y contraseñas) van en la base de datos.** Tu aplicación está diseñada para almacenar y mostrar esta información de forma segura.

### **🗄️ ESTRUCTURA DE LA BASE DE DATOS:**

```sql
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,           -- Nombre del servicio
  email TEXT NOT NULL,                 -- Email de acceso
  password TEXT NOT NULL,              -- Contraseña de acceso
  end_date TEXT NOT NULL,              -- Fecha de expiración
  image_url TEXT,                      -- URL de la imagen
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 **CÓMO CONFIGURAR LAS CREDENCIALES:**

### **Opción 1: Script Interactivo (RECOMENDADO)**
```bash
cd backend
npm run update-credentials
```

El script te pedirá:
1. **Email** para cada servicio
2. **Contraseña** para cada servicio
3. **Actualizará automáticamente** el archivo de configuración

### **Opción 2: Edición Manual**
Edita el archivo `backend/config-services.js` y reemplaza:
- `tu-email-real-XXXXX@gmail.com` → Tu email real
- `tu-contraseña-real-XXXXX` → Tu contraseña real

## 📝 **ARCHIVO DE CONFIGURACIÓN:**

```javascript
// backend/config-services.js
module.exports = {
  services: [
    {
      name: 'Netflix',
      email: 'tu-email-real-netflix@gmail.com',     // ← REEMPLAZA AQUÍ
      password: 'tu-contraseña-real-netflix',      // ← REEMPLAZA AQUÍ
      end_date: '2024-12-31',
      image_url: '/img/netflix.png'
    },
    // ... otros servicios
  ]
};
```

## 🔒 **SEGURIDAD:**

### **✅ LO QUE ESTÁ PROTEGIDO:**
- **Autenticación JWT** requerida para acceder a las credenciales
- **Solo usuarios autenticados** pueden ver los servicios
- **Base de datos local** (no expuesta a internet)
- **HTTPS** recomendado en producción

### **⚠️ CONSIDERACIONES:**
- **No subir** el archivo de configuración a repositorios públicos
- **Usar variables de entorno** en producción
- **Encriptar contraseñas** si es necesario (opcional)

## 🎯 **FLUJO DE FUNCIONAMIENTO:**

1. **Usuario inicia sesión** → Se autentica con JWT
2. **Accede a servicios** → Ve lista de servicios disponibles
3. **Hace clic en servicio** → Modal muestra credenciales
4. **Credenciales visibles** → Email y contraseña del servicio

## 📱 **INTERFAZ DEL USUARIO:**

### **Lista de Servicios:**
- Muestra nombre, imagen y fecha de expiración
- **NO muestra** credenciales (solo al hacer clic)

### **Modal de Detalles:**
- **Email** del servicio
- **Contraseña** del servicio
- **Fecha de expiración**
- **Imagen del servicio**

## 🛠️ **COMANDOS DISPONIBLES:**

```bash
# Verificar estado de la base de datos
npm run check-db

# Actualizar credenciales de servicios
npm run update-credentials

# Iniciar servidor
npm run dev

# Crear usuario
npm run create-user
```

## 🔄 **ACTUALIZACIÓN AUTOMÁTICA:**

- **Al reiniciar el servidor** se aplican los cambios automáticamente
- **Base de datos se limpia** y se reinsertan los servicios
- **Nuevas credenciales** se cargan desde el archivo de configuración

## 💡 **EJEMPLOS DE USO:**

### **Configurar Netflix:**
```javascript
{
  name: 'Netflix',
  email: 'miemail@gmail.com',
  password: 'mi-contraseña-secreta',
  end_date: '2024-12-31',
  image_url: '/img/netflix.png'
}
```

### **Configurar Disney+:**
```javascript
{
  name: 'Disney+',
  email: 'otro-email@hotmail.com',
  password: 'otra-contraseña',
  end_date: '2025-01-15',
  image_url: '/img/disney.png'
}
```

## 🎉 **RESULTADO FINAL:**

Tu aplicación ahora:
- ✅ **Almacena credenciales** de forma segura
- ✅ **Muestra servicios** con información completa
- ✅ **Permite acceso** a emails y contraseñas
- ✅ **Se actualiza automáticamente** al cambiar configuración
- ✅ **Mantiene seguridad** con autenticación JWT

**¡Las credenciales están completamente integradas en tu sistema!** 🔐✨
