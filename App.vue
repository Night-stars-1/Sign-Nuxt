<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 15:36:40
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-01 23:50:26
-->
<script setup lang="ts">
import { darkTheme, type GlobalThemeOverrides } from "naive-ui";

const start = ref(false);
const bgImage = useBackground();
const bgLoad = useBgload();
const isAnimationEnd = ref(false);
useHead({
  title: "签到系统",
  titleTemplate: "%s - 签到系统",
});

const osTheme = useOsTheme();
const theme = computed(() =>
  osTheme.value === "dark" ? (start.value ? darkTheme : null) : null
);
onMounted(() => {
  start.value = true;
});

const lightThemeOverrides: GlobalThemeOverrides = {
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
  },
};

const darkThemeOverrides: GlobalThemeOverrides = {
  Card: {
    color: "rgb(0 0 0 / 65%)",
    actionColor: "none",
    borderColor: "none",
  },
  Dialog: {
    color: "rgb(0 0 0 / 65%)",
  },
  Modal: {
    color: "rgb(0 0 0 / 65%)",
  },
};

onMounted(() => {
  setTimeout(() => {
    bgLoad.value = true;
  }, 1500);
});
</script>

<template>
  <NuxtLoadingIndicator />
  <img
    class="background"
    :class="{ 'animation-end': isAnimationEnd }"
    alt="background"
    :src="bgImage"
    v-show="bgLoad"
    @animationend="isAnimationEnd = true"
  />
  <NuxtRouteAnnouncer />
  <SiteLoading />

  <NConfigProvider
    :class="theme?.name"
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
    :theme="theme"
  >
    <NMessageProvider>
      <NDialogProvider>
        <NuxtLayout>
          <template #sidebar>
            <SiteSideBar />
          </template>
          <template #main>
            <NuxtPage />
          </template>
        </NuxtLayout>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style lang="scss" scoped>
.background {
  object-fit: cover;
  position: absolute;
  filter: blur(20px) brightness(0.3);
  transition: filter 0.3s, transform 0.3s;
  animation: fade-blur-in 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  // background-size: cover;
  z-index: -1;
  width: 100%;
  height: 100vh;
}

@keyframes fade-blur-in {
  from {
    filter: blur(20px) brightness(0.3);
    transform: scale(1.6);
  }

  to {
    filter: blur(0px) brightness(1);
    transform: scale(1);
  }
}

@media (max-width: 600px) {
  .background {
    background-position: center;
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 1);
}

.page-enter-from {
  opacity: 0;
  filter: blur(3px);
}

.page-leave-to {
  opacity: 0;
  filter: blur(3px);
}
</style>
