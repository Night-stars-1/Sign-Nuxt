<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 21:26:17
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-26 21:06:11
-->
<script setup lang="ts">
defineProps<{
  name?: string;
  icon?: Component;
  to?: string;
  collapse?: boolean;
}>();

defineEmits(["click"]);
</script>

<template>
  <NuxtLink :to="to" @click="$emit('click')">
    <NButton
      class="site-nav-item"
      :class="{ 'is-active': $route.path == to }"
      strong
      secondary
      :color="$route.path == to ? '#0a4d94' : 'black'"
    >
      <template #icon>
        <NIcon size="20" :component="icon" />
      </template>
      <p class="site-nav-text" :class="{ 'is-active': $route.path == to }">
        {{ collapse === false ? name : "" }}
      </p>
    </NButton>
  </NuxtLink>
</template>

<style lang="scss" coped>
.site-nav-item {
  &.is-active {
    border: 2px solid #0a4d94;
    width: calc(100% + 4px);
    margin-left: -2px;
  }
  &:has(.is-active)::before {
    position: absolute;
    border-radius: 4px;
    left: 12px;
    width: 4px;
    height: 14px;
    content: "";
    background: #0a4d94;
  }

  & {
    height: 40px;
    width: 100%;
    justify-content: flex-start;
    padding: 0 20px;
    background-color: rgba(255, 255, 255, 0.3) !important;
  }
}
</style>
