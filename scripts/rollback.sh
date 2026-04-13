#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "❌ Vui lòng truyền ngày vào!"
  echo "👉 Ví dụ: ./rollback.sh 20261212"
  exit 1
fi

BACKUP_TAG=$1

echo "🔄 Rolling back to $BACKUP_TAG..."

echo "🔄 Switching to backup image..."
docker tag corefe-core-fe:$BACKUP_TAG corefe-core-fe:latest || { echo "❌ No backup image $BACKUP_TAG found!"; exit 1; }

echo "⏳ Stopping current containers..."
docker compose down

echo "🚀 Starting containers with backup image..."
docker compose up -d --force-recreate

echo "🧹 Cleaning up dangling images..."
docker image prune -f

echo "✅ Rollback to $BACKUP_TAG successful!"