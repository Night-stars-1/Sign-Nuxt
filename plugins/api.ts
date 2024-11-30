/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-22 15:48:31
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-30 20:03:26
 */
import type { FetchResponse } from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie("token");

  function handleError<T>(
    response: FetchResponse<ResponseModel<T>> & FetchResponse<ResponseType>
  ) {
    const err = (text: string, message?: string) => {
      nuxtApp.runWithContext(() => window?.$message?.error(message ?? text));
    };
    if (!response._data) {
      err("请求超时，服务器无响应！");
      return;
    }
    const handleMap: { [key: number]: () => void } = {
      404: () => err("服务器资源不存在", response._data?.message),
      500: () => err("服务器内部错误", response._data?.message),
      403: () => err("没有权限访问该资源", response._data?.message),
      401: () => {
        err("登录状态已过期，需要重新登录", response._data?.message);
        nuxtApp.runWithContext(() => {
          useCookie("token").value == null;
          navigateTo("/login");
        });
      },
    };
    if (handleMap[response.status]) handleMap[response.status]();
    else err("未知错误！", response._data?.message);
  }

  const api = $fetch.create({
    // 请求拦截器
    onRequest({ options }) {
      options.baseURL = "/api/";
      options.headers = new Headers(options.headers);
      options.headers.set("Authorization", `Bearer ${token.value}`);
    },
    // 响应拦截
    onResponse({ response }) {
      if (response._data.code !== 0) {
        handleError(response);
        return Promise.reject(response._data);
      }
      // 成功返回
      return response._data;
    },
    // 错误处理
    onResponseError({ response }) {
      handleError(response);
      return Promise.reject(response?._data ?? null);
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
