module.exports = {
  apps: [
    {
      name: 'warm-heaven-care',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Error log configuration
      error_file: '/var/log/warm-heaven-care/error.log',
      out_file: '/var/log/warm-heaven-care/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // Merge logs
      merge_logs: true,
      // Log rotation
      log_type: 'json',
      max_size: '10M',
      retain: '30',
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      // Metrics
      metrics: {
        http: true,
        deep_metrics: true,
        metric_interval: 60,
      },
      // Health check endpoint
      health_check: {
        url: 'http://localhost:3000/api/health',
      },
      // Restart on memory threshold
      max_memory_restart: '1G',
      // Cluster mode configuration
      instance_var: 'INSTANCE_ID',
      // Error handling
      max_restarts: 10,
      min_uptime: '5s',
      // Source map support for stack traces
      source_map_support: true,
      // Node.js flags
      node_args: [
        '--max-old-space-size=2048',
        '--expose-gc',
      ],
      // Environment specific settings
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
  // Deploy configuration
  deploy: {
    production: {
      user: 'nextjs',
      host: 'localhost',
      ref: 'origin/main',
      repo: 'git@github.com:username/warm-heaven-care.git',
      path: '/var/www/warm-heaven-care',
      'post-deploy': 'npm ci && npm run build && pm2 reload pm2.config.js --env production',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};