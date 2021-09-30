import reactRefresh from "@vitejs/plugin-react-refresh";
import { config } from "dotenv";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

config();

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  define: {
    "process.env.NODE_ENV": JSON.stringify(command === "serve" ? "development" : "production"),
  },
  plugins: [reactRefresh(), checker({ typescript: true })],
  server: {
    proxy: {
      "/api": {
        target: process.env.API_URL || "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
}));
