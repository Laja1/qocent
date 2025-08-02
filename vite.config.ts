import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";


// SEO & SSG plugins: 
import ViteSitemap from "vite-plugin-sitemap";
import { createHtmlPlugin } from "vite-plugin-html";

// Optional: For better SEO, consider adding these plugins
// import { VitePWA } from 'vite-plugin-pwa';
// const routes = [
//   { path: '/', name: 'Home' },
//   { path: '/about-us', name: 'About' },
//   { path: '/explore', name: 'Explore Services' },
//   { path: '/docs', name: 'Documentation' },


// ];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // viteSSG({ includedRoutes: () => routes }),
    // Enhanced sitemap configuration
    ViteSitemap({
      hostname: "https://qocent.com",
      generateRobotsTxt: true,
      // Use dynamicRoutes instead of routes
      dynamicRoutes: [
        '/',
        '/about',
        '/explore',
        '/contact',
        '/docs',
        // Add all your app routes here
      ],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      // robots.txt will be generated automatically with basic rules
      // For custom robots.txt content, create a separate robots.txt file in public/
    }),

    // Enhanced HTML plugin with better SEO
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
      inject: {
        data: {
          title: "Qocent - One Window, All Cloud",
          description: "Deploy, manage, and optimize across AWS, GCP, Huawei, and more all from a single, powerful console that delivers speed, savings, and simplicity without compromise.",
          keywords: "cloud management, AWS, GCP, Huawei Cloud, multi-cloud, cloud console",
          author: "Qocent",
          ogImage: "https://qocent.com/og-image.jpg",
          url: "https://qocent.com",
        },
      },
      template: 'index.html',
    }),

    // Optional: PWA for better performance and SEO
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    //   manifest: {
    //     name: 'Qocent - One Window, All Cloud',
    //     short_name: 'Qocent',
    //     description: 'Multi-cloud management console',
    //     theme_color: '#000000',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ]
    //   }
    // }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          helmet: ["react-helmet"],
          // Add other chunk optimizations based on your dependencies
        },
      },
    },
    // Optimize for better loading
    cssCodeSplit: true,
    sourcemap: false, // Disable in production for better performance
  },

  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-helmet'],
  },
});