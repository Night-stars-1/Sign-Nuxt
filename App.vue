<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 15:36:40
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2025-01-08 14:43:24
-->
<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN, type GlobalThemeOverrides } from "naive-ui";

const bgImage = useBackground();
const bgLoad = useBgload();
const isAnimationEnd = ref(false);
const bg = ref<HTMLImageElement>();

useHead({
  title: "签到系统",
  titleTemplate: "%s - 签到系统",
});

const theme = useTheme();
useHeadSafe({
  bodyAttrs: {
    class: theme.value,
  },
});
watch(theme, (theme, oldTheme) => {
  document.body.classList.remove(oldTheme);
  document.body.classList.add(theme);
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
  Input: {
    color: "rgb(0 0 0 / 10%)",
    border: "1px solid #0000",
    colorFocus: "none",
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
  Input: {
    color: "rgb(0 0 0 / 65%)",
    border: "1px solid #0000",
    colorFocus: "rgb(0 0 0 / 45%)",
  },
};

onMounted(async () => {
  setTimeout(() => {
    bgLoad.value = true;
  }, 1500);
  getUserInfo();
  bgLoad.value = bg.value?.complete ?? false
});
</script>

<template>
  <NuxtLoadingIndicator />
  <img
    class="background"
    :class="{ 'animation-end': isAnimationEnd }"
    alt="background"
    ref="bg"
    :src="bgImage"
    @load="bgLoad = true"
    @error.once="bgLoad = true"
    @animationend="isAnimationEnd = true"
  />
  <NuxtRouteAnnouncer />
  <SiteLoading />

  <NConfigProvider
    :theme-overrides="
      theme === 'dark' ? darkThemeOverrides : lightThemeOverrides
    "
    :theme="theme === 'dark' ? darkTheme : null"
    :locale="zhCN"
    :date-locale="dateZhCN"
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
  position: fixed;
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

// 页面切换动画
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
