/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 21:06:49
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-22 15:23:46
 */
import { setup } from "@css-render/vue3-ssr";
import { defineNuxtPlugin, type NuxtSSRContext } from "#app";

export default defineNuxtPlugin((_nuxtApp) => {
  if (import.meta.server) {
    const { collect } = setup(_nuxtApp.vueApp)
    useServerHead({
      style: () => {
        const stylesString = collect()
        const stylesArray = stylesString.split(/<\/style>/g).filter(style => style)
        return stylesArray.map((styleString: string) => {
          const match = styleString.match(/<style cssr-id="([^"]*)">([\s\S]*)/)
          if (match) {
            const id = match[1]
            return { 'cssr-id': id, 'children': match[2] }
          }
          return {}
        })
      },
    })
  }
})