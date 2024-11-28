<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 15:36:40
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-28 23:05:08
-->
<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'

const bgImage = useBackground();
const bgLoad = useBgload();
useHead({
  title: "签到系统",
  titleTemplate: "%s - 签到系统",
});

const themeOverrides: GlobalThemeOverrides  = {
  Card: {
    color: "rgb(255 255 255 / 65%)",
    actionColor: "none",
    borderColor: "none",
  },
  Dialog: {
    color: "rgb(255 255 255 / 65%)",
  },
  Modal: {
    color: "rgb(255 255 255 / 65%)",
  }
};
</script>

<template>
  <NuxtLoadingIndicator />
  <img class="background" :src="bgImage" @load="bgLoad = true" />
  <NuxtRouteAnnouncer />
  <SiteLoading />

  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider>
      <NDialogProvider>
        <NuxtLayout>
          <template #sidebar>
            <SiteNav />
          </template>
          <template #main>
            <NuxtPage />
          </template>
        </NuxtLayout>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped>
.background {
  object-fit: cover;
  position: fixed;
  /* background-size: cover; */
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
@media (max-width: 600px) {
  .background {
    background-position: center;
  }
}
</style>
