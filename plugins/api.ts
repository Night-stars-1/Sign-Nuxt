/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-20 12:52:05
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-22 00:32:57
 */
export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig();
  const BASE_URL = appConfig.BASE_URL;

  const token = useCookie("token");

  const api = $fetch.create({
    baseURL: BASE_URL,
    onRequest({ options }) {
      options.headers.set("Authorization", `Bearer ${token.value}`);
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      } else {
        await nuxtApp.runWithContext(() =>
          useMessage().error(response._data.message ?? "未知错误")
        );
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
