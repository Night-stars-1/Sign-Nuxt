<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-30 19:21:53
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-24 13:38:26
-->
<script setup lang="ts">
import { DeviceType } from "~/types/device";
const device = useDevice();
const message = useMessage();
const bgLoad = useBgload();

onBeforeMount(() => {
  window.$message = message;
});
</script>

<template>
  <section
    class="layout"
    :class="{ mobile: device === DeviceType.Mobile }"
    v-show="bgLoad"
  >
    <header>
      <slot name="sidebar"></slot>
    </header>

    <main
      class="content"
      :class="{ 'not-padding': ['/login'].includes($route.path) }"
    >
      <slot name="main"></slot>
    </main>
  </section>
</template>

<style lang="scss" scoped>
.layout {
  .content {
    &.not-padding {
      padding: 0px;
    }
    & {
      flex-grow: 1; /* 右侧内容区域自适应宽度 */
      padding: 20px;
      box-sizing: border-box;
    }
  }

  &.mobile {
    header {
      height: 51px;
    }
    & {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  }
  &:not(.mobile) {
    .content {
      overflow: auto;
    }
    & {
      height: 100vh;
      transform: scale(1);
      transition: transform 0.3s;
      animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        forwards;
      height: 100vh;
    }
  }
  & {
    display: flex;
    overflow: hidden;
  }
}

@keyframes fade-blur-main-in {
  from {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
}
</style>
