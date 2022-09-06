import reactRefresh from "@vitejs/plugin-react-refresh";
import { config } from "dotenv";
import { defineConfig } from "vite";

config();

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  define: {
    "process.env.NODE_ENV": JSON.stringify(command === "serve" ? "development" : "production"),
  },
  plugins: [reactRefresh()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
}));
