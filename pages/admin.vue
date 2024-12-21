<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-24 01:44:49
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-21 18:32:25
-->
<script setup lang="ts">
import { UserGroup } from "~/types/user";
interface Info {
  notice: string;
  isRegister: boolean;
}

useHead({
  title: "管理",
});

const info = ref<Info>();
const userInfo = useUserInfo();
const isAdmin = computed(() => userInfo.value.group == UserGroup.Admin);
const loading = ref(false);

const runAll = async () => {
  loading.value = true;
  await useHttp.post("admin/run/all");
  loading.value = false;
};

const getInfo = async () => {
  const { data } = await useHttp.get<Info>("admin/info");
  info.value = data;
};
getInfo();

const toggleReg = async () => {
  loading.value = true;
  await useHttp.post("admin/toggle/reg");
  getInfo();
  loading.value = false;
};
</script>

<template>
  <div class="admin-content">
    <div class="admin-btn-content" v-show="isAdmin">
      <NButton type="primary" :loading="loading" @click="runAll">
        一键运行
      </NButton>
      <NButton type="primary" :loading="loading" @click="toggleReg">
        {{ info?.isRegister ? "关闭注册" : "开启注册" }}
      </NButton>
    </div>
    <AdminInfoTable />
  </div>
</template>

<style lang="scss" scoped>
.admin-content {
  .admin-btn-content {
    display: flex;
    gap: 8px;
  }
  & {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
