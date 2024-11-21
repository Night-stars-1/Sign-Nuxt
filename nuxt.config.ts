/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 15:36:40
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-21 21:37:15
 */
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  appConfig: {
    BASE_URL: process.env.BASE_URL,
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxtjs-naive-ui"],
  css: ["~/assets/scss/main.scss"],
  vite: {
    plugins: [
      AutoImport({
        dts: "imports.d.ts",
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        dts: "components.d.ts",
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
});
