<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 16:09:18
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-22 21:52:04
-->
<template>
  <div class="site-nav">
    <div class="top">
      <SiteNavItem name="主页" to="/home" />
      <SiteNavItem name="我的任务" to="/tasks" />
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
