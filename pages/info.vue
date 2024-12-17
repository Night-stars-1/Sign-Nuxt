<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-12-17 19:10:30
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-17 19:45:44
-->
<script setup lang="ts">
import { debounce } from "lodash";

const group2Name = new Map([
  ["0", "普通用户"],
  ["1", "管理员"],
  ["-1", "未知"],
]);
const group = ref("");
const message = useMessage();
let deleteNum = 0;
let deleteTimeout: NodeJS.Timeout;

onBeforeMount(() => {
  group.value = localStorage.getItem("group") ?? "-1";
});

const deleteUser = async () => {
  console.log(deleteNum)
  deleteTimeout ?? clearTimeout(deleteTimeout);
  deleteTimeout = setTimeout(() => (deleteNum = 0), 3000);
  if (deleteNum < 3) {
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
    <ClientOnly>
      <NCard title="个人信息">
        <p>身份组: {{ group2Name.get(group) ?? "未知" }}</p>

        <template #header-extra>
          <NButton @click="handleDelete"> 注销 </NButton>
        </template>
      </NCard>
    </ClientOnly>
  </div>
</template>
