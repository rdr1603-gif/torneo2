# 🚀 Guía de Deployment en Vercel

## Requisitos Previos

- GitHub account
- Vercel account
- Variables de entorno configuradas

---

## Paso 1: Preparar el Repositorio

```bash
# Asegurar que todo está en orden
npm run build
npm run test:coverage
npm run type-check

# Commit y push
git add .
git commit -m "chore: ready for production"
git push origin main
```

---

## Paso 2: Conectar con Vercel

### Opción A: CLI de Vercel

```bash
npm i -g vercel
vercel login
vercel link
vercel deploy --prod
```

### Opción B: Vercel Dashboard

1. Ir a [vercel.com](https://vercel.com)
2. Click "New Project"
3. Importar repositorio de GitHub
4. Vercel detectará Next.js automáticamente
5. Configurar variables de entorno
6. Deploy

---

## Paso 3: Configurar Variables de Entorno

En Vercel Dashboard → Project Settings → Environment Variables

Agregar todas las variables de `.env.local`:

```
DATABASE_URL
REDIS_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
FIREBASE_*
SENTRY_DSN
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

### IMPORTANT: NEXTAUTH_URL

En producción, debe ser:
```
NEXTAUTH_URL=https://your-domain.vercel.app
```

---

## Paso 4: Database Setup

### PostgreSQL en Supabase

1. Crear cuenta en [supabase.com](https://supabase.com)
2. Crear nuevo proyecto
3. Copiar DATABASE_URL
4. Ejecutar migraciones:

```bash
DATABASE_URL="tu-url" npx prisma migrate deploy
npx prisma db seed
```

### Redis

Usar Upstash:
1. Crear cuenta en [upstash.com](https://upstash.com)
2. Crear Redis database
3. Copiar URL a REDIS_URL

---

## Paso 5: Primera Ejecución

```bash
# Vercel ejecutará automáticamente:
npm install
npm run build

# Luego iniciará:
npm start
```

---

## Monitoreo Post-Deployment

### 1. Vercel Analytics
- Dashboard: https://vercel.com/dashboard
- Ver Core Web Vitals
- Ver analytics real-time

### 2. Sentry Monitoring
- Dashboard: https://sentry.io
- Ver errores en tiempo real
- Configurar alertas

### 3. Health Check
```bash
curl https://your-domain.vercel.app/api/health
```

Debe retornar:
```json
{
  "status": "ok",
  "timestamp": "...",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 123.45
}
```

---

## Troubleshooting

### Build Fails

```bash
# Verificar que package.json está correcto
npm run build

# Limpiar cache de Vercel
vercel env pull
rm -rf .next
npm install
npm run build
```

### Database Connection Error

```bash
# Verificar DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Environment Variables Not Working

- Verificar que están en Project Settings
- No están en `.env.local`
- Hacer redeploy después de agregar

---

## Canary Deployment

### 1. Cambios en canary (5% tráfico)

```bash
# En Vercel Dashboard → Deployments
# Click en un deployment anterior
# → Promote to Production (5%)
```

### 2. Monitorear

- Verificar error rate < 0.5%
- Verificar latency < 200ms p95
- Observar user feedback

### 3. Promover a 100%

Una vez validado, promover completamente a production.

---

## Rollback

```bash
# Si hay problema crítico
vercel rollback --prod

# O en dashboard:
# Deployments → Seleccionar build anterior → Promote
```

---

## Custom Domain

1. Vercel Dashboard → Project Settings → Domains
2. Agregar dominio personalizado
3. Configurar DNS según instrucciones
4. Esperar propagación DNS (puede tomar 24h)

---

## SSL/HTTPS

- ✅ Automático en vercel.app
- ✅ Automático en dominio personalizado
- Certificado de Let's Encrypt
- Auto-renewal

---

## Performance Optimization

### Build Output Size

```bash
npm run analyze
# Ver qué está ocupando espacio

# Optimizar imports
# - Tree shaking habilitado
# - Code splitting automático
# - Image optimization activado
```

### Runtime Performance

- Edge Functions (si necesario)
- ISR (Incremental Static Regeneration)
- Redis caching
- CDN global

---

## Monitoreo Continuo

### Vercel Checks
- [ ] Deploy successful
- [ ] No build warnings
- [ ] Health check passing

### Application Checks
- [ ] API responses <200ms p95
- [ ] Error rate <0.5%
- [ ] Database connected
- [ ] Redis connected

### User Feedback
- [ ] Motor inteligente aceptación >80%
- [ ] Usuarios reportan satisfacción
- [ ] No crashes reportados

---

## Escalado

Si crece mucho:

1. **Database**: Supabase puede escalar automáticamente
2. **Redis**: Upstash Pro plan
3. **Vercel**: Pro/Enterprise plan para más resources
4. **CDN**: Cloudflare gratuito en frente

---

## Costos Mensuales (Aprox.)

| Servicio | Plan | Costo |
|----------|------|-------|
| Vercel | Pro | $20/mes |
| Supabase | Pro | $25/mes |
| Upstash | Pro | $45/mes |
| Sentry | Pro | $25/mes |
| **Total** | | **~$115/mes** |

---

## Checklist Final

- [ ] Database migraciones ejecutadas
- [ ] Environment variables configuradas
- [ ] Health check passing
- [ ] Sentry conectado
- [ ] Analytics habilitado
- [ ] SSL/HTTPS funcionando
- [ ] Custom domain apuntando correctamente
- [ ] Canary deployment completado
- [ ] 100% rollout exitoso
- [ ] Monitoreo activo
- [ ] On-call setup completado

---

**¡Ready for Production! 🎉**
