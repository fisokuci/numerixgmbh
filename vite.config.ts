import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./", // wichtig für Doppelklick/relative Pfade
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
    cssCodeSplit: false,        // CSS einbetten
    modulePreload: false,       // keine Preload-Links
    assetsInlineLimit: 100_000_000, // Assets als data: URLs einbetten
    rollupOptions: {
      output: {
        manualChunks: undefined,     // kein Code-Splitting
        inlineDynamicImports: true,  // dynamische Imports bündeln
      },
    },
  },
  plugins: [
    react(),
    viteSingleFile(),  // sorgt für Single-File-Output
    expressPlugin(),   // nur im Dev-Server aktiv (apply: "serve")
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();
      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
