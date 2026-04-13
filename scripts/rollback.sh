#!/bin/bash
set -e

# Kiểm tra có truyền ngày vào không
if [ -z "$1" ]; then
  echo "❌ Vui lòng truyền ngày vào!"
  echo "👉 Ví dụ: ./rollback.sh 20261212"
  exit 1
fi

DATE=$1
BACKUP_TAG="backup_$DATE"

echo "🔄 Rolling back to $BACKUP_TAG..."

echo "🔄 Switching to backup image..."
docker tag corefe-core-fe:$BACKUP_TAG corefe-core-fe:latest || { echo "❌ No backup image $BACKUP_TAG found!"; exit 1; }

echo "⏳ Stopping current containers..."
docker compose down

echo "🧹 Cleaning up dangling images..."
docker image prune -f

echo "🚀 Starting containers with backup image..."
docker compose up -d

echo "✅ Rollback to $BACKUP_TAG successful!"