<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 16:09:18
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-16 23:52:17
-->
<template>
  <div class="site-nav">
    <SiteNavItem name="主页" to="/home" />
    <SiteNavItem name="我的任务" to="/tasks" />
  </div>
</template>

<style lang="scss" scoped>
.site-nav {
  display: flex;
  gap: 8px;
  flex-direction: column;
}
</style>
