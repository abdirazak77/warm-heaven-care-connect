/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  generateRobotsTxt: false, // We've already created a custom robots.txt
  exclude: [
    '/api/*',
    '/auth/*',
    '/admin/*',
    '/manager/*',
    '/supervisor/*',
    '/nurse/*',
    '/caregiver/*',
  ],
  generateIndexSitemap: false,
  outDir: 'public',
  transform: async (config, path) => {
    // Custom transform function for each path
    return {
      loc: path,
      changefreq: 'daily',
      priority: path === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    };
  },
};