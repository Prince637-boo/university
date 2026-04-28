#!/bin/bash
set -e

echo "Waiting for MySQL to be ready..."
while ! nc -z ${MYSQL_SERVER:-mysql} ${MYSQL_PORT:-3306}; do
  sleep 1
done
echo "MySQL is ready!"

echo "Running database migrations..."
cd /app
python -m alembic upgrade head || true

echo "Starting uvicorn..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
