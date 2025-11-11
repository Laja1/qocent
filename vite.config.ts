import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
// import Sitemap from "vite-plugin-sitemap";

// Note: Sitemap generation is handled via the manual script at scripts/generate-sitemap.js
// Run: node scripts/generate-sitemap.js before building
// The script generates public/sitemap.xml with all public routes

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Sitemap can be generated manually using: node scripts/generate-sitemap.js
    // Or configure vite-plugin-sitemap based on your specific version's API
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

 
});