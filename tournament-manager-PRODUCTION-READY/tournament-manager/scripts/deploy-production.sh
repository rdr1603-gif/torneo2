#!/bin/bash

set -e

echo "🚀 Starting Production Deployment..."

# 1. Build
echo "📦 Building application..."
npm run build

# 2. Test
echo "🧪 Running tests..."
npm run test:coverage

# 3. Type check
echo "🔍 Type checking..."
npm run type-check

# 4. Database migration
echo "💾 Running database migrations..."
npx prisma migrate deploy

# 5. Health check
echo "💓 Running health checks..."
sleep 5
curl -f http://localhost:3000/api/health || {
  echo "❌ Health check failed!"
  exit 1
}

# 6. Notify
echo "✅ Deployment successful!"
echo "🎉 Application is ready for production!"
