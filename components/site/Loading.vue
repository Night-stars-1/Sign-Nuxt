<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 20:37:47
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-29 23:15:45
-->
<script setup lang="ts">
const bgLoad = useBgload();
</script>

<template>
  <div class="main" :class="{ loaded: bgLoad }">
    <div class="loading">
      <NSpin size="large" />
      <div>Loading..</div>
    </div>
    <div class="loader-section right"></div>
    <div class="loader-section left"></div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  .loading {
    display: flex;
    position: absolute;
    gap: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #f0f0f0;
    z-index: 1;
  }

  .loader-section {
    &.left {
      clip-path: polygon(0 0, 100% 0, 0 100%);
      left: 0;
    }

    &.right {
      clip-path: polygon(100% 0, 100% 100%, 0 100%);
      right: 0;
    }

    & {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
    }
  }

  & {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
}

.loaded {
  .left {
    transform: translateX(-100%);
    transition: transform 0.5s 0.2s cubic-bezier(0.38, 0.46, 0.33, 0.9);
  }

  .right {
    transform: translateX(100%);
    transition: transform 0.5s 0.2s cubic-bezier(0.38, 0.46, 0.33, 0.9);
  }

  .loading {
    display: none;
  }

  & {
    transform: translateY(-100%);
    transition: transform 0.1s 0.7s ease-out;
  }
}
</style>
