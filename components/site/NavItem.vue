<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 21:26:17
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-18 20:55:11
-->
<script setup lang="ts">
defineProps<{
  name: string;
  icon?: string;
  to: string;
}>();
</script>

<template>
  <NuxtLink :to="to">
    <NButton
      class="site-nav-item"
      :class="{ 'is-active': $route.path == to }"
      color="rgba(255, 255, 255, .3)"
    >
      <p class="site-nav-text" :class="{ 'is-active': $route.path == to }">
        {{ name }}
      </p>
    </NButton>
  </NuxtLink>
</template>

<style scoped>
.site-nav-item {
  height: 40px;
  width: 100%;
}
.site-nav-item.is-active {
  border: 2px solid #0a4d94;
}

.site-nav-text {
  color: black;
}
.site-nav-text.is-active {
  color: #0a4d94;
}

.site-nav-item:hover .site-nav-text {
  color: #0a4d94;
}
</style>
