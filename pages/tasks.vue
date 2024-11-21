<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 23:52:39
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-21 13:31:27
-->
<script setup lang="ts">
enum StatusCode {
  StopStatus,
  RunStatus,
}
interface Data {
  name: string;
  id: number;
  status: StatusCode;
  actionId: number;
}

const dialog = useDialog();
const dataList = ref<Data[]>([]);
const showAddTask = ref(false);
const addTaskValue = ref(null);
const addTaskOptions = [
  {
    label: "米游社",
    value: "mihoyo",
  },
];

onBeforeMount(() => {
  useAPI(`task/list`, {
    onResponse: ({ response }) => {
      dataList.value = response._data.data;
    },
  });
});

const run = async (data: Data) => {
  data.status = StatusCode.RunStatus;
  const { data: result } = await useAPI<ResponseModel>(`task/run/${data.id}`);
  if (!result.value) return;
  data.actionId = result.value.data.actionId;
};

const log = async (data: Data) => {
  const { data: result } = await useAPI<ResponseModel>(
    `task/log/${data.id}/${data.actionId}`
  );
  dialog.success({
    title: "日志",
    content: () =>
      h("div", { style: { whiteSpace: "pre-line" } }, result.value?.data.log),
    positiveText: "关闭",
    onClose: () => {},
  });
};

const addTask = () => {
  showAddTask.value = true;
};
</script>

<template>
  <NCard title="任务列表">
    <template #header-extra>
      <NButton type="success" dashed @click="addTask"> 添加任务 </NButton>
    </template>
    <ClientOnly fallback-tag="span" fallback="加载任务中...">
      <NGrid x-gap="12" y-gap="12" cols="1 m:2 l:4" responsive="screen">
        <NGi v-if="dataList.length == 0">
          <NSkeleton height="150px" :sharp="false" size="medium" />
        </NGi>
        <NGi v-for="data in dataList">
          <NCard class="task-card" :id="data.id">
            <div>任务名称 {{ data.name }}</div>
            <template #action>
              <NSpace justify="space-between">
                <NButton
                  :loading="data.status == StatusCode.RunStatus"
                  @click="run(data)"
                >
                  执行
                </NButton>
                <NButton :disabled="data.actionId <= 0" @click="log(data)">
                  日志
                </NButton>
              </NSpace>
            </template>
          </NCard>
        </NGi>
      </NGrid>
    </ClientOnly>
  </NCard>
  <NModal v-model:show="showAddTask">
    <NCard
      style="width: 500px; height: 450px"
      title="添加任务"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      content-style="gap: 8px; display: flex; flex-direction: column; align-items: center;"
    >
      <NSelect
        placeholder="选择任务"
        v-model:value="addTaskValue"
        :options="addTaskOptions"
      />
      <TaskMihoyo v-if="addTaskValue == 'mihoyo'" @close="showAddTask = !showAddTask" />
    </NCard>
  </NModal>
</template>

<style lang="scss">
.task-card {
  .n-card__action {
    padding: 10px var(--n-padding-left);
  }
}
</style>
