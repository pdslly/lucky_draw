import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_TITLE } = loadEnv(mode, process.cwd());

  return defineConfig({
    server: {
      open: true,
      host: "0.0.0.0",
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: VITE_TITLE,
          },
        },
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
