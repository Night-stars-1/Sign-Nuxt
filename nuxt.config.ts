/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 15:36:40
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-24 02:19:05
 */
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
console.log(process.env.SERVER_PROXY)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
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
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
  nitro: {
    // 用于客户端代理
    devProxy: {
      "/api": {
        target: "http://127.0.0.1:58080", // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      },
    },
    // 该配置用于服务端请求转发
    routeRules: {
      "/api/**": {
        proxy: process.env.SERVER_PROXY,
      },
    },
  },
});
