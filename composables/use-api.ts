/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-19 18:42:52
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-20 21:39:54
 */
import type { UseFetchOptions } from "nuxt/app";
import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";

export function useAPI<T>(
    url: string | (() => string),
    options?: UseFetchOptions<T>
) {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$api as typeof $fetch,
    });
}

export function useRenderAPI(
    url: NitroFetchRequest,
    options?: NitroFetchOptions<any>
) {
    return useNuxtApp().$api(url, {
        ...options,
    });
}
