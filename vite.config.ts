// import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      open: false,
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }) as any,
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      host: "localhost",
    },
    watch: {
      ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
    },
    // warmup chuẩn bị file trước khi dev, khi yarn dev -> sẽ load các file này trước
    warmup: {
      clientFiles: ["./src/main.tsx", "./src/App.tsx", "./src/component/layout/MainLayout.tsx"],
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router",
      "react-router-dom",
      "@mui/material",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
      "@tanstack/react-query",
    ],
  },

  resolve: {
    alias: {
      "@uikit": path.resolve(__dirname, "libs1/uikit"),
      "@constants-libs": path.resolve(__dirname, "libs1/constants"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false, // ⚠️ Cẩn thận nếu có side effects như import CSS
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
