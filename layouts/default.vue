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
  <div
    class="layout"
    :class="{ mobile: device === DeviceType.Mobile }"
    v-show="bgLoad"
  >
    <slot name="sidebar"></slot>

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
  .content {
    &.not-padding {
      padding: 0px;
    }
    & {
      flex-grow: 1; /* 右侧内容区域自适应宽度 */
      padding: 20px;
      box-sizing: border-box;
      overflow: auto;
    }
  }

  &.mobile {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  & {
    display: flex;
    height: 100vh;
    transform: scale(1.2);
    transition: transform 0.3s;
    animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      forwards;
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
