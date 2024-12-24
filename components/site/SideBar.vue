<script setup lang="ts">
import { MenuRound } from "@vicons/material";

const isClick = ref(false);
const message = useMessage();

onBeforeMount(() => {
  window.$message = message;
});
</script>

<template>
  <div
    class="sidebar only-desktop"
    v-if="!['login'].includes($route.name as string)"
  >
    <SiteNav v-model:is-click="isClick" />
  </div>

  <div
    class="drawer-bg only-mobile"
    v-if="isClick"
    @click="isClick = !isClick"
  ></div>
  <div
    class="topbar only-mobile mobile-header"
    v-show="!['login'].includes($route.name as string)"
  >
    <NButton class="topbar-btn" text @click="isClick = !isClick">
      <NIcon size="40" :component="MenuRound" />
    </NButton>
    <div class="sidebar" :class="{ show: isClick }">
      <SiteNav v-model:is-click="isClick" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  // flex: 1;
  // position: absolute;
  height: 100vh;
  background-color: #3b4f64;
  padding: 7px;
  box-sizing: border-box;
}

@keyframes fade-blur-main-in {
  from {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
}

.drawer-bg {
  background-color: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.topbar {
  .topbar-btn {
    padding-top: 5px;
    padding-inline: 5px;
  }

  .sidebar {
    &.show {
      transform: translate3d(0px, 0, 0);
    }

    & {
      // width: 200px;
      padding: 20px;
      box-sizing: border-box;
      position: fixed;
      left: 0px;
      top: 0px;
      z-index: 9999;
      transition: transform 0.3s;
      transform: translate3d(-220px, 0, 0);
    }
  }

  &.mobile-header {
    background-color: var(--sidebar-background-color);
    box-shadow: 0 2px 10px #0003;
    z-index: 999;
  }

  & {
    width: 100vw;
    position: fixed;
  }
}
</style>
