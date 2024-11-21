const BASE_URL = "http://127.0.0.1:58080/";

export default defineNuxtPlugin((nuxtApp) => {
    const token = useCookie("token");

    const api = $fetch.create({
        baseURL: BASE_URL,
        onRequest({ options }) {
            options.headers.set("Authorization", `Bearer ${token.value}`);
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await nuxtApp.runWithContext(() => navigateTo("/login"));
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
