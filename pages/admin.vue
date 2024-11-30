<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-24 01:44:49
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-24 03:22:22
-->
<script setup lang="ts">
import { UserGroup } from '~/types/user';

useHead({
  title: "管理",
});

const isAdmin = ref(false);
const loading = ref(false);

onBeforeMount(() => {
  isAdmin.value = localStorage.getItem("group") == UserGroup.Admin.toString();
});

const runall = async () => {
  loading.value = true;
  await useHttp.post("admin/run/all");
  loading.value = false;
};
</script>

<template>
  <div v-show="isAdmin">
    <NButton type="primary" :loading="loading" @click="runall"> 一键运行 </NButton>
  </div>
</template>
