#!/bin/bash
set -e

echo "=========================================="
echo "🚀 Running Dua Narasi Deployment Script..."
echo "=========================================="

# 1. Update source code (if run manually)
if [ -d ".git" ]; then
    echo "📥 Pulling latest git updates..."
    git fetch origin main
    git reset --hard origin/main
fi

# 2. Check if running with Docker Compose
if [ -f "docker-compose.yml" ] && command -v docker &> /dev/null; then
    echo "🐳 Building and starting Docker containers..."
    docker compose up -d --build --remove-orphans

    echo "🗄️ Pushing Prisma schema to database..."
    docker compose exec -T web npx prisma db push

    echo "🧹 Cleaning up dangling Docker images..."
    docker image prune -f

    echo "✅ Docker deployment completed!"
    docker compose ps
    exit 0
fi

# 3. Fallback: Native Node.js & PM2
if command -v pm2 &> /dev/null; then
    echo "📦 Installing dependencies..."
    npm ci

    echo "🔄 Generating Prisma Client..."
    npx prisma generate

    echo "🗄️ Pushing database schema..."
    npx prisma db push

    echo "🏗️ Building Next.js production bundle..."
    npm run build

    echo "♻️ Reloading PM2 process..."
    pm2 reload duanarasi || pm2 restart duanarasi || pm2 start npm --name "duanarasi" -- start
    pm2 save

    echo "✅ PM2 deployment completed!"
    pm2 status
    exit 0
fi

echo "❌ Error: Neither Docker Compose nor PM2 was found on this system."
exit 1
