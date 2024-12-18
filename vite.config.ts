import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: true,
    assetsDir: "assets",
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
});
