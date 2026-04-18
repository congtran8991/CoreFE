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
  // optimizeDeps dùng tối ưu các thư viện khi chạy yarn dev
  // khi chạy yarn dev thì các thư viện trong includes sẽ được esbuild tối ưu thành 1 file js.
  // VD. react -> react.js, mui -> mui.js, react-router -> react-router.js, react-router-dom -> react-router-dom.js, @mui/material -> @mui/material.js, @mui/icons-material -> @mui/icons-material.js, @emotion/react -> @emotion/react.js, @emotion/styled -> @emotion/styled.js, @tanstack/react-query -> @tanstack/react-query.js 
  // khi browser load thay vì chạy MUI 100file thì browser chỉ call 1 file
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
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom'],

          // React Router
          'vendor-router': ['react-router-dom'],

          // MUI
          'vendor-mui': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],

          // React Query
          'vendor-query': ['@tanstack/react-query'],

          // Form
          'vendor-form': [
            'react-hook-form',
            '@hookform/resolvers',
            'yup',
          ],

          // HTTP
          'vendor-http': ['axios'],
        },
      },
    },
  },
});
