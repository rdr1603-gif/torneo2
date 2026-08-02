# ⚡ Quick Start - 5 minutos

## 1️⃣ Instalar dependencias
```bash
npm install
```

## 2️⃣ Configurar env
```bash
cp .env.example .env.local
# Editar .env.local con:
# - DATABASE_URL (PostgreSQL)
# - REDIS_URL (Redis local o Upstash)
# - NEXTAUTH_SECRET (generado)
```

## 3️⃣ Base de datos
```bash
npx prisma migrate dev
npx prisma db seed
```

## 4️⃣ Iniciar desarrollo
```bash
npm run dev
```

Acceder a: **http://localhost:3000**

---

## 🚀 Para Producción (Vercel)

### Opción Simple (Recomendada)

```bash
# 1. Login en Vercel
npm i -g vercel
vercel login

# 2. Deploy
vercel
```

Vercel auto-detecta Next.js y configura todo.

### Opción Manual

1. Conectar GitHub a Vercel
2. Import proyecto
3. Agregar env variables
4. Deploy

---

## 📚 Documentación Completa

- `README.md` - Overview del proyecto
- `docs/DEPLOYMENT.md` - Guía detallada de deployment
- `docs/API.md` - API reference
- `docs/ARCHITECTURE.md` - Arquitectura del sistema

---

## 🆘 Ayuda Rápida

| Problema | Solución |
|----------|----------|
| `Error: Cannot find module 'prisma'` | `npm install` |
| `Database connection error` | Verificar `DATABASE_URL` en `.env.local` |
| `Port 3000 already in use` | `npm run dev -- -p 3001` |
| `Prisma migration failed` | `npx prisma migrate dev --skip-generate` |

---

## ✨ Features Principales

✅ Motor Inteligente (IA que elige partidos)
✅ Real-time WebSocket updates
✅ Dashboard analytics
✅ A/B Testing del motor
✅ Feedback de usuarios
✅ Totalmente type-safe (TypeScript)
✅ Production-ready

---

## 📞 Soporte

- Issues: GitHub
- Email: support@tournament-manager.com
- Docs: Leer `README.md` y `docs/`

---

**¡Listo para empezar! 🚀**
