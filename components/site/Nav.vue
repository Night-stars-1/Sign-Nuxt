<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 16:09:18
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-24 02:04:44
-->
<script setup lang="ts">
import { HomeTwotone, TaskTwotone, AdminPanelSettingsTwotone } from '@vicons/material';
import { UserGroup } from '~/types/user';

const isAdmin = ref(false)
onBeforeMount(() => {
  console.log(localStorage.getItem("group"), localStorage.getItem("group") == UserGroup.Admin.toString())
  isAdmin.value = localStorage.getItem("group") == UserGroup.Admin.toString()
})
</script>

<template>
  <div class="site-nav">
    <div class="top">
      <SiteNavItem name="主页" to="/home" :icon="HomeTwotone"/>
      <SiteNavItem name="我的任务" to="/tasks" :icon="TaskTwotone" />
      <SiteNavItem name="管理" to="/admin" :icon="AdminPanelSettingsTwotone" v-if="isAdmin" />
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
