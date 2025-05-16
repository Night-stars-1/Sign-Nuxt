<script setup lang="ts">
import { EditNoteTwotone } from "@vicons/material";
import { UserGroup } from "~/types/user";
useHead({
  title: "首页",
});

const showModal = ref(false);
const notice = ref("");
const userInfo = useUserInfo();
const isAdmin = computed(() => userInfo.value.group == UserGroup.Admin);

const getNotice = async () => {
  const { message } = await useHttp.get<ResponseModel>("info/notice");
  notice.value = message;
};
getNotice();

function setNotice() {
  showModal.value = true;
}
async function saveNotice() {
  await useHttp.post<ResponseModel>("info/notice", {
    notice: notice.value,
  });
  getNotice();
}
</script>

<template>
  <div>
    <NSpace vertical>
      <NCard title="签到信息">
        <div class="sign-card-content">
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
        </div>
      </NCard>

      <NCard title="公告">
        {{ notice }}
        <template #header-extra>
          <ClientOnly>
            <NButton text v-if="isAdmin">
              <NIcon
                size="20"
                :component="EditNoteTwotone"
                @click="setNotice"
              />
            </NButton>
          </ClientOnly>
        </template>
      </NCard>
    </NSpace>
    <NModal
      v-model:show="showModal"
      preset="dialog"
      title="编辑公告"
      positiveText="确定"
      :onPositiveClick="saveNotice"
    >
      <NInput
        v-model:value="notice"
        type="textarea"
        placeholder="基本的 Textarea"
      />
    </NModal>
  </div>
</template>

<style lang="css" scoped>
.sign-card-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
