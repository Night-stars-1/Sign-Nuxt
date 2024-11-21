<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 20:37:47
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-19 21:20:40
-->
<script setup lang="ts">
const loadingEle = ref()
onMounted(() => {
  loadingEle.value.style.display = "none";
});
</script>

<template>
  <div class="main">
    <div class="loading text-center" ref="loadingEle">
    <NSpin size="large" />
    <div>Loading..</div>
  </div>
  </div>

</template>

<style scoped>
.main {
  position: absolute;
  width: 100%;
  z-index: 999;
}

.loading {
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
