import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    optimizeDeps: {
    include: ['react-datepicker']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
      utils: path.resolve(__dirname, "./src/lib/utils"),
      ui: path.resolve(__dirname, "./src/components/ui"),
      lib: path.resolve(__dirname, "./src/lib"),
      hooks: path.resolve(__dirname, "./src/hooks"),
    },
  },
  server: {
    proxy: {
      // Match the API URL path and forward it to the backend
      "/api": {
        target: "https://wallet-web-application-bxne.onrender.com", // Your backend URL
        changeOrigin: true, // Change the origin of the request to the target URL
        secure: false, // Disable SSL verification (useful for development if backend uses self-signed certificates)
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Optionally remove '/api' from the request path
      },
    },
  },
});
