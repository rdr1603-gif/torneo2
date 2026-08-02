# 🎯 INSTRUCCIONES DE DEPLOYMENT EN VERCEL

## 📋 Antes de Deployar

### 1. Verificar que el proyecto está listo
```bash
# Asegurarse que todo compila
npm run build

# Ejecutar tests
npm run test:coverage

# Verificar tipos
npm run type-check
```

### 2. Crear accounts necesarias

- [ ] GitHub account (para el repo)
- [ ] Vercel account (vercel.com)
- [ ] Supabase account (supabase.com) - PostgreSQL
- [ ] Upstash account (upstash.com) - Redis
- [ ] Sentry account (sentry.io) - Error tracking

---

## 🚀 PASO A PASO DEPLOYMENT

### OPCIÓN 1: Vercel CLI (Más rápido)

```bash
# 1. Instalar CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy (interactivo)
vercel

# 4. Configurar env vars cuando pida
# - DATABASE_URL (de Supabase)
# - REDIS_URL (de Upstash)
# - NEXTAUTH_SECRET (generada)
# - NEXTAUTH_URL (https://your-vercel-url.com)
# - FIREBASE_* (si tienes)
# - SENTRY_DSN (si tienes)

# 5. Esperar a que compile y deploy
# 6. Testing automático en Vercel
```

### OPCIÓN 2: GitHub + Vercel Dashboard (Más seguro)

```bash
# 1. Crear repo en GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tournament-manager.git
git push -u origin main

# 2. Ir a vercel.com
# 3. Click "Add New" → Project
# 4. Import GitHub repo
# 5. Framework: Next.js (detectado automáticamente)
# 6. Build Command: npm run build (default)
# 7. Output Directory: .next (default)
# 8. Install Command: npm ci (default)

# 9. ⚠️ IMPORTANTE: Agregar Environment Variables
# Environment: Production
# Agregar variables:
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
NEXTAUTH_SECRET=<generar con: openssl rand -base64 32>
NEXTAUTH_URL=https://<tu-dominio>.vercel.app
SENTRY_DSN=...
FIREBASE_PROJECT_ID=...
# etc...

# 10. Click Deploy
# 11. Esperar 2-5 minutos
```

---

## 🗄️ CONFIGURAR DATABASE

### PostgreSQL con Supabase

1. Ir a [supabase.com](https://supabase.com)
2. Sign up / Login
3. New Project
4. Nombre: `tournament-manager`
5. Region: Seleccionar la más cercana
6. Copiar **Connection String** (Connection Pooling)
7. Pegar en `DATABASE_URL` de Vercel

```bash
# Ejecutar migraciones
DATABASE_URL="tu-connection-string" npx prisma migrate deploy
npx prisma db seed
```

### Redis con Upstash

1. Ir a [upstash.com](https://upstash.com)
2. Sign up / Login
3. Create Database
4. Name: `tournament-manager-prod`
5. Region: Us-East-1 (o cercano a tu DB)
6. Seleccionar plan Free/Pro
7. Copiar **REST URL**
8. Pegar en `REDIS_URL` de Vercel

---

## 🔐 GENERAR SECRETS

### NEXTAUTH_SECRET

```bash
# En terminal
openssl rand -base64 32

# Copiar output a NEXTAUTH_SECRET en Vercel
# Ejemplo: 9fL2jK8x...
```

### NEXTAUTH_URL

```
Para Vercel: https://<tu-proyecto>.vercel.app
Para custom domain: https://tournament-manager.com
```

---

## ✅ POST-DEPLOYMENT CHECKLIST

Después de hacer deploy:

- [ ] Build completó exitosamente (ver Vercel Dashboard)
- [ ] No hay errores en console
- [ ] Health check: `https://tu-app.vercel.app/api/health`
- [ ] Database conectada (Supabase)
- [ ] Redis conectada (Upstash)
- [ ] Login funciona
- [ ] Motor Inteligente retorna recomendaciones

### Test Health Check

```bash
curl https://tu-app.vercel.app/api/health

# Debe retornar:
# {"status":"ok","timestamp":"...","version":"1.0.0",...}
```

---

## 🔍 TROUBLESHOOTING

### ❌ "Build failed"

**Solución:**
```bash
# Ver logs detallados en Vercel Dashboard
# Build & Deployment → Logs

# Común: Variable env no definida
# Ir a Settings → Environment Variables
# Verificar que todas estén agregadas

# Común: Prisma migration error
# Ejecutar localmente:
DATABASE_URL="..." npx prisma migrate deploy
```

### ❌ "Cannot connect to database"

**Solución:**
```bash
# 1. Verificar DATABASE_URL en Vercel Settings
# 2. Copiar URL exacta de Supabase
# 3. Verificar que tiene formato correcto:
#    postgresql://user:password@host/database

# 4. Test connection:
psql "tu-database-url" -c "SELECT 1"

# 5. Si sigue fallando:
# Supabase Dashboard → Settings → Database
# Reset password y generar nueva URL
```

### ❌ "Redis connection timeout"

**Solución:**
```bash
# 1. Verificar REDIS_URL en Vercel Settings
# 2. Debe ser URL REST, no la normal
# 3. Upstash dashboard → Copy REST URL

# Si el app funciona sin Redis:
# Es non-critical. Funciona sin cache,
# pero más lento. Fix después.
```

### ❌ "NEXTAUTH_SECRET not set"

**Solución:**
```bash
# 1. En Vercel Dashboard
# 2. Settings → Environment Variables
# 3. Agregar NEXTAUTH_SECRET
# 4. Generar con: openssl rand -base64 32
# 5. Deploy again
```

---

## 🚨 PROBLEMAS COMUNES

| Problema | Causa | Solución |
|----------|-------|----------|
| 502 Bad Gateway | App crashed | Ver logs en Vercel → check error |
| 404 on /api/... | Ruta no existe | Verificar `src/app/api/` estructura |
| "Cannot find module" | Dependencia faltante | `npm install`, luego redeploy |
| Lentitud en BD | Sin índices | `npx prisma db seed` agregó índices |
| Redis no conecta | URL incorrecta | Copy REST URL de Upstash |

---

## 📈 MONITOREO DESPUÉS DEL DEPLOY

### 1. Verificar Lighthouse Score
```bash
# En Vercel Dashboard
# Analytics → Core Web Vitals

# Target:
# LCP < 2.5s ✓
# CLS < 0.1 ✓
# FID < 100ms ✓
```

### 2. Verificar Sentry
```
https://sentry.io
Debe mostrar 0 errors si todo está bien
```

### 3. Verificar Motor Inteligente
- Crear torneo
- Agregar equipos
- Motor debería sugerir partidos

---

## 🎉 ¡DEPLOYMENT EXITOSO!

Si llegaste aquí sin errores:

✅ App corriendo en producción
✅ Database funcionando
✅ Cache (Redis) funcionando
✅ Auth funcionando
✅ Motor Inteligente funcionando
✅ Monitoring activo

---

## 📞 AYUDA RÁPIDA

| Pregunta | Respuesta |
|----------|-----------|
| ¿Cómo cambiar env variables? | Vercel Dashboard → Settings → Environment Variables |
| ¿Cómo hacer rollback? | Vercel Dashboard → Deployments → Select anterior → Promote |
| ¿Cómo ver logs? | Vercel Dashboard → Deployments → Seleccionar → Logs |
| ¿Cómo custom domain? | Vercel Dashboard → Settings → Domains |
| ¿Precio? | Vercel: Free-$20/mes, Supabase: Free-$25/mes, Upstash: Free-$45/mes |

---

**¡A disfrutar de tu app en producción! 🚀**

Para más ayuda: Leer `docs/DEPLOYMENT.md`
