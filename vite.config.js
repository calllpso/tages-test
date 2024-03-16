import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader"; // dynamic svg

const __filename = fileURLToPath(import.meta.url);

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {},
    }),
  ],
  // base: "/tages-test/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
});
