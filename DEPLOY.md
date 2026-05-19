# Despliegue APP-STREAMS

## Backend — Railway

1. Crea un proyecto en [Railway](https://railway.app) y conecta el repo (carpeta raíz del servicio: `backendv2`).
2. Añade un plugin **PostgreSQL** y vincula `DATABASE_URL`.
3. Variables de entorno en Railway:

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Auto desde PostgreSQL |
| `JWT_SECRET` | Secreto largo aleatorio |
| `SERVICE_ENCRYPTION_KEY` | 64 caracteres hex (32 bytes) |
| `CORS_ORIGIN` | URL del frontend Vercel, ej. `https://tu-app.vercel.app` |
| `NODE_ENV` | `production` |

4. El `railway.json` ya define build y start (`prisma db push`, seed admin, `node dist/main`).
5. Tras el deploy, anota la URL pública (ej. `https://app-streams-production.up.railway.app`).
6. Healthcheck: `GET /api/health`

**Admin por defecto:** usuario `PEPE`, contraseña `admin123` (cámbiala tras el primer login).

---

## Frontend — Vercel

1. Importa el repo en [Vercel](https://vercel.com).
2. **Root Directory:** `frontend`
3. Variables de entorno:

| Variable | Valor |
|----------|--------|
| `RAILWAY_URL` | URL del backend Railway (sin barra final) |
| `NEXT_PUBLIC_API_URL` | Misma URL (para imágenes `/uploads`) |

4. Deploy. Las rutas `/api/*` se proxean al backend vía `src/app/api/[...proxy]/route.ts`.

---

## Orden recomendado

1. Deploy backend en Railway → copiar URL.
2. Configurar `CORS_ORIGIN` en Railway con la URL de Vercel (puedes actualizarla tras el primer deploy del front).
3. Deploy frontend en Vercel con `RAILWAY_URL` y `NEXT_PUBLIC_API_URL`.
4. Login como admin y crear servicios desde `/admin/services`.

---

## Desarrollo local

```bash
# Backend
cd backendv2
cp .env.example .env   # editar valores
pnpm install && pnpm prisma:generate && pnpm prisma:migrate
pnpm dev

# Frontend (otra terminal)
cd frontend
cp .env.example .env.local
pnpm install && pnpm dev
```
