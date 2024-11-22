<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 15:36:40
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-22 15:22:14
-->
<script setup lang="ts">
const bgImage = useBackground();
</script>

<template>
  <NuxtLoadingIndicator />
  <div class="background" :style="{ backgroundImage: `url(${bgImage})` }"></div>
  <NuxtRouteAnnouncer />
  <SiteLoading />
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
</template>

<style scoped>
.background {
  position: fixed;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
