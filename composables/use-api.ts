/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-19 18:42:52
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-25 12:22:46
 */

// 自动导出
export const useHttp = {
  get: <T = any>(url: string, params?: any) => {
    return useNuxtApp().$api<ResponseModel<T>>(url, { method: "get", params });
  },

  post: <T = any>(url: string, body?: any) => {
    return useNuxtApp().$api<ResponseModel<T>>(url, { method: "post", body });
  },

  put: <T = any>(url: string, body?: any) => {
    return useNuxtApp().$api<ResponseModel<T>>(url, { method: "put", body });
  },

  delete: <T = any>(url: string, body?: any) => {
    return useNuxtApp().$api<ResponseModel<T>>(url, { method: "delete", body });
  },
};
