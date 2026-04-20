/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "virtual:pwa-register": resolve(__dirname, "src/__mocks__/virtual-pwa-register.ts"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
  },
});
