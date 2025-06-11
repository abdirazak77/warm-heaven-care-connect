module.exports = {
  ci: {
    collect: {
      // Number of runs to perform for each URL
      numberOfRuns: 3,
      
      // URLs to analyze
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/auth/login',
        'http://localhost:3000/dashboard',
      ],
      
      // Settings for collecting data
      settings: {
        preset: 'desktop',
        chromeFlags: ['--no-sandbox', '--headless'],
        // Skip network throttling for CI environment
        throttling: {
          rttMs: 0,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
      
      // Static server configuration
      staticDistDir: './.next',
    },

    upload: {
      // Upload configuration for Lighthouse CI server
      target: 'temporary-public-storage',
    },

    assert: {
      // Performance budget thresholds
      assertions: {
        // Performance metrics
        'first-contentful-paint': ['error', { minScore: 0.8 }],
        'largest-contentful-paint': ['error', { minScore: 0.8 }],
        'speed-index': ['error', { minScore: 0.8 }],
        'total-blocking-time': ['error', { minScore: 0.8 }],
        'cumulative-layout-shift': ['error', { minScore: 0.8 }],
        
        // PWA requirements
        'service-worker': 'error',
        'installable-manifest': 'error',
        'splash-screen': 'error',
        'themed-omnibox': 'error',
        
        // Best practices
        'uses-text-compression': 'error',
        'uses-responsive-images': 'error',
        'efficient-animated-content': 'error',
        'duplicated-javascript': 'error',
        
        // Accessibility
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'aria-required-children': 'error',
        'aria-required-parent': 'error',
        'aria-roles': 'error',
        'aria-valid-attr-value': 'error',
        'aria-valid-attr': 'error',
        'button-name': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'image-alt': 'error',
        'link-name': 'error',
        'list': 'error',
        'listitem': 'error',
        
        // SEO
        'meta-description': 'error',
        'http-status-code': 'error',
        'link-text': 'error',
        'crawlable-anchors': 'error',
        'robots-txt': 'error',
        
        // Custom thresholds
        'resource-summary:script:size': ['error', { maxNumericValue: 300000 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 100000 }],
        'resource-summary:image:size': ['error', { maxNumericValue: 200000 }],
        'resource-summary:font:size': ['error', { maxNumericValue: 100000 }],
      },
    },

    server: {
      // Configuration for running Lighthouse CI server locally
      port: 9001,
      storage: {
        storageMethod: 'sql',
        sqlDialect: 'sqlite',
        sqlDatabasePath: './.lighthouse/db.sql',
      },
    },
  },
};