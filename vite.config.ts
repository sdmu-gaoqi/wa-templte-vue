import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import viteImagemin from "vite-plugin-imagemin";
import postCssPxToRem from "postcss-pxtorem";
import svgLoader from "vite-svg-loader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({
      defaultImport: "component",
    }),
    mkcert(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      hooks: path.resolve(__dirname, "src/hooks"),
      styles: path.resolve(__dirname, "src/styles"),
      pages: path.resolve(__dirname, "src/pages"),
      components: path.resolve(__dirname, "src/components"),
      mocks: path.resolve(__dirname, "mocks"),
    },
  },
  server: {
    https: true,
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 75,
          propList: ["*"],
          selectorBlackList: ["./to", "html"], // to开头的不进行转换,
          exclude: "/node_modules",
          unit: "wx",
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/main.scss";',
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
