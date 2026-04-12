#!/bin/bash
set -e

echo "⏳ Stopping current containers..."
docker compose down

echo "🔄 Switching to backup image..."
docker tag corefe-core-fe:backup corefe-core-fe:latest || { echo "❌ No backup image found!"; exit 1; }

echo "🚀 Starting containers with backup image..."
docker compose up -d

echo "✅ Rollback successful!"