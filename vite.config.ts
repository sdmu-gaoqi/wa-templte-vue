import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import vueJsx from "@vitejs/plugin-vue-jsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      hooks: path.resolve(__dirname, "src/hooks"),
      styles: path.resolve(__dirname, "src/assets/style"),
      pages: path.resolve(__dirname, "src/pages"),
      components: path.resolve(__dirname, "src/components"),
      mocks: path.resolve(__dirname, "mocks"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/main.scss";',
      },
      less: {
        modifyVars: {
          // 在这里自定义主题色等样式
          "primary-color": "#fc8352",
          "link-color": "#fc8352",
          "border-radius-base": "2px",
          "btn-border-radius-base": "20px",
          "btn-height-base": "40px",
        },
        javascriptEnabled: true,
      },
    },
  },
});
