import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";


// SEO & SSG plugins: 

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

 
});