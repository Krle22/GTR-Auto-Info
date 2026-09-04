import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// We use an async function here so Vite allows dynamic imports
export default defineConfig(async () => {
  // Check if we are actually developing inside Replit
  const isReplitDev = process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined;
  
  const replitPlugins = [];
  if (isReplitDev) {
    // Only import these when running live inside Replit
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    const { devBanner } = await import("@replit/vite-plugin-dev-banner");
    replitPlugins.push(cartographer(), devBanner());
  }

  return {
    base: '/', // Essential for proper routing on your custom domain
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...replitPlugins,
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
