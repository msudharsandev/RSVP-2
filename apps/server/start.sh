#!/bin/sh

set -e

echo "Migrations started"
npx prisma migrate deploy
echo "Migrations completed successfully"
exec node dist/app.js
