<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 23:52:39
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-22 15:56:27
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

const { data } = await useHttp.get<Data[]>("task/list");
dataList.value = data;

const run = async (_data: Data) => {
  _data.status = StatusCode.RunStatus;
  const { data } = await useHttp.get(`task/run/${_data.id}`);
  _data.actionId = data.actionId;
};

const log = async (_data: Data) => {
  const { data } = await useHttp.get<any>(
    `task/log/${_data.id}/${_data.actionId}`
  );
  dialog.success({
    title: "日志",
    content: () => h("div", { style: { whiteSpace: "pre-line" } }, data.log),
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
          <TaskMihoyo
            v-if="addTaskValue == 'mihoyo'"
            @close="showAddTask = !showAddTask"
          />
        </NCard>
      </NModal>
    </ClientOnly>
  </NCard>
</template>

<style lang="scss">
.task-card {
  .n-card__action {
    padding: 10px var(--n-padding-left);
  }
}
</style>
