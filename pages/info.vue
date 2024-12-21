<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-12-17 19:10:30
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-21 16:43:35
-->
<script setup lang="ts">
import { debounce } from "lodash-es";

const message = useMessage();
const userInfo = useUserInfo();
let deleteNum = 0;
let deleteTimeout: NodeJS.Timeout;

const deleteUser = async () => {
  deleteTimeout ?? clearTimeout(deleteTimeout);
  deleteTimeout = setTimeout(() => (deleteNum = 0), 3000);
  if (deleteNum < 2) {
    deleteNum++;
    message.success("请在3秒内再次点击");
  } else {
    const { code } = await useHttp.post("user/delete");
    if (code == 0) {
      message.success("注销成功");
    }
  }
};
const handleDelete = debounce(deleteUser, 200);
</script>

<template>
  <div>
    <NCard title="个人信息">
      <p>ID: {{ userInfo.id }}</p>
      <p>身份组: {{ getGroupName(userInfo.group) ?? "未知" }}</p>

      <template #header-extra>
        <NButton @click="handleDelete"> 注销 </NButton>
      </template>
    </NCard>
  </div>
</template>
