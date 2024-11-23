<script setup lang="ts">
import { MenuRound } from '@vicons/material';
import { DeviceType } from "~/types/device";
const isClick = ref(false);
const device = useDevice();
const message = useMessage();
onBeforeMount(() => {
  window.$message = message;
});

onMounted(() => {
  document.querySelectorAll(".mobile-header .site-nav-item").forEach((elem) => {
    elem.addEventListener("click", () => (isClick.value = false));
  });
});
</script>

<template>
  <div class="layout" :class="{ mobile: device === DeviceType.Mobile }">
    <div
      class="sidebar only-desktop"
      v-if="!['login'].includes($route.name as string)"
    >
      <slot name="sidebar"></slot>
    </div>

    <div
      class="drawer-bg only-mobile"
      v-if="isClick"
      @click="isClick = !isClick"
    ></div>
    <div
      class="topbar only-mobile mobile-header"
      v-if="!['login'].includes($route.name as string)"
    >
      <NButton class="topbar-btn" text @click="isClick = !isClick">
          <NIcon size="40" :component="MenuRound" />
      </NButton>
      <div class="sidebar" :class="{ show: isClick }">
        <slot name="sidebar"></slot>
      </div>
    </div>

    <main
      class="content"
      :class="{ 'not-padding': ['/login'].includes($route.path) }"
    >
      <slot name="main"></slot>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  .sidebar {
    // flex: 1;
    width: 180px;
    min-width: 180px;
    background-color: #3b4f64;
    padding: 7px;
    box-sizing: border-box;
  }
  & {
    display: flex;
    height: 100vh;
  }
}

.layout.mobile {
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
        width: 200px;
        height: 100vh;
        background-color: #e5effd;
        padding: 20px;
        box-sizing: border-box;
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 9999;
        transition: transform 0.3s;
        transform: translate3d(-200px, 0, 0);
      }
    }

    &.mobile-header {
      background-color: white;
      box-shadow: 0 2px 10px #0003;
      z-index: 999;
    }

    & {
      width: 100vw;
    }
  }

  & {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
}

.content {
  &.not-padding {
    padding: 0px;
  }
  flex-grow: 1; /* 右侧内容区域自适应宽度 */
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
