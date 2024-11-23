<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 16:09:18
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-23 18:50:38
-->
<script setup lang="ts">
import { HomeFilled, TaskTwotone } from '@vicons/material';
</script>

<template>
  <div class="site-nav">
    <div class="top">
      <SiteNavItem name="主页" to="/home" :icon="HomeFilled"/>
      <SiteNavItem name="我的任务" to="/tasks" :icon="TaskTwotone" />
    </div>
    <div class="bottom"></div>
  </div>
</template>

<style lang="scss" scoped>
.site-nav {
  .bottom,
  .top {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

  & {
    display: flex;
    flex-direction: column;
    justify-content: space-between
  }
}
</style>
