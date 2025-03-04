import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  let host;
  let httpsOptions;
  return {
    server: {
      host: mode === "development" ? host : false,
      https: mode === "development" ? httpsOptions : undefined,
    },
    define: {
      "process.env": {
        VUE_APP_BASE_API: env.VUE_APP_BASE_API,
        VUE_APP_BASE_SERVER_FILE: env.VUE_APP_BASE_SERVER_FILE,
        VUE_APP_BASE_SERVER_SIGNAL: env.VUE_APP_BASE_SERVER_SIGNAL,
      },
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@axios": fileURLToPath(
          new URL("./src/plugins/axios", import.meta.url)
        ),
      },
    },
    build: {
      chunkSizeWarningLimit: 5000,
    },
    optimizeDeps: {
      entries: ["./src/**/*.vue"],
    },
  };
});
