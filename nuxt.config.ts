/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 15:36:40
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-01 23:21:00
 */
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
		pageTransition: { name: 'page', mode: 'out-in' }
	},
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["nuxtjs-naive-ui"],
  css: ["~/assets/scss/main.scss"],
  vite: {
    plugins: [
      AutoImport({
        dts: "types/imports.d.ts",
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
              "useOsTheme",
            ],
          },
        ],
      }),
      Components({
        dts: "types/components.d.ts",
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
        target: process.env.BASE_URL,
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
