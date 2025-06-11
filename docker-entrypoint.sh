#!/bin/sh
set -e

# Function to wait for a service to be ready
wait_for_service() {
    local service_host="$1"
    local service_port="$2"
    local service_name="$3"
    
    echo "Waiting for $service_name to be ready..."
    until nc -z "$service_host" "$service_port"; do
        echo "$service_name is unavailable - sleeping"
        sleep 2
    done
    echo "$service_name is ready!"
}

# Create necessary directories with correct permissions
mkdir -p /var/log/warm-heaven-care
chown -R nextjs:nodejs /var/log/warm-heaven-care

# Verify environment variables
required_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "NEXT_PUBLIC_APP_URL"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: Required environment variable $var is not set."
        exit 1
    fi
done

# Wait for dependent services if specified
if [ -n "$DATABASE_HOST" ] && [ -n "$DATABASE_PORT" ]; then
    wait_for_service "$DATABASE_HOST" "$DATABASE_PORT" "Database"
fi

if [ -n "$REDIS_HOST" ] && [ -n "$REDIS_PORT" ]; then
    wait_for_service "$REDIS_HOST" "$REDIS_PORT" "Redis"
fi

# Apply database migrations if needed
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Running database migrations..."
    npm run migrate
fi

# Clear cache if requested
if [ "$CLEAR_CACHE" = "true" ]; then
    echo "Clearing application cache..."
    rm -rf .next/cache
fi

# Set up log rotation
cat > /etc/logrotate.d/warm-heaven-care << EOF
/var/log/warm-heaven-care/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    missingok
    create 0640 nextjs nodejs
}
EOF

# Set up application monitoring
if [ "$ENABLE_MONITORING" = "true" ]; then
    echo "Setting up application monitoring..."
    pm2 install pm2-logrotate
    pm2 install pm2-server-monit
fi

# Optimize node for production
export NODE_OPTIONS="--max-old-space-size=4096 --expose-gc"

# Start the application
echo "Starting Warm Heaven Care Connect..."
exec "$@"