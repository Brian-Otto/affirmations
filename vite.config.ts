/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      workbox: { globPatterns: ["**/*.{js,css,html,ico,png,svg,woff}"] },
    }),
  ],
  test: { environment: "jsdom" },
  base: "/affirmations/",
});
