<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-24 01:44:49
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2025-01-08 14:50:24
-->
<script setup lang="ts">
import { NInputNumber } from "naive-ui";
import { UserGroup } from "~/types/user";
interface Info {
  notice: string;
  isRegister: boolean;
  maxMihoyoExchange: number;
}

useHead({
  title: "管理",
});

const info = ref<Info>({
  notice: "",
  isRegister: false,
  maxMihoyoExchange: 0,
});
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

const setMaxMihoyoExchange = async () => {
  loading.value = true;
  await useHttp.post("admin/max_mihoyo_exchange", {
    count: info.value.maxMihoyoExchange,
  });
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
    <NForm>
      <NFormItem
        label="米游社商品兑换任务最大数量"
        path="info.maxMihoyoExchange"
      >
        <NInputNumber v-model:value="info.maxMihoyoExchange" />
        <NButton
          type="primary"
          style="margin-left: 8px;"
          :loading="loading"
          @click="setMaxMihoyoExchange"
        >
          保存
        </NButton>
      </NFormItem>
    </NForm>
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
