/**
 * Manual sitemap generator script
 * Run with: node scripts/generate-sitemap.js
 * 
 * This script generates a sitemap.xml file for SEO purposes.
 * The vite-plugin-sitemap should handle this automatically during build,
 * but this script can be used for manual generation or CI/CD pipelines.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicRoutes = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about-us", changefreq: "monthly", priority: 0.8 },
  { path: "/explore", changefreq: "weekly", priority: 0.9 },
  { path: "/docs", changefreq: "weekly", priority: 0.8 },
  { path: "/our-partners", changefreq: "monthly", priority: 0.7 },
  { path: "/contact", changefreq: "monthly", priority: 0.6 },
  { path: "/careers", changefreq: "monthly", priority: 0.6 },
  { path: "/privacy", changefreq: "yearly", priority: 0.3 },
  { path: "/terms", changefreq: "yearly", priority: 0.3 },
  { path: "/cookies", changefreq: "yearly", priority: 0.3 },
];

const hostname = "https://qocent.com";
const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes
  .map(
    (route) => `  <url>
    <loc>${hostname}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');

console.log('✅ Sitemap generated successfully at:', outputPath);
console.log(`📄 Generated ${publicRoutes.length} URLs`);

