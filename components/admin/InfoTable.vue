<script setup lang="ts">
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  type DataTableColumns,
  type PaginationProps,
} from "naive-ui";
import type { UserGroup } from "~/types/user";

interface UserInfo {
  id: number;
  email: string;
  password: string;
  group: UserGroup;
}
interface UserInfoResp {
  list: UserInfo[];
  total: number;
}

const dialog = useDialog();
const message = useMessage();
const data = ref<UserInfo[]>([]);
const loading = ref(false);
const pagination = reactive<PaginationProps>({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount }) {
    return h(
      "div",
      {
        style: {
          color: "var(--text-other-color)",
        },
      },
      `共 ${itemCount} 条数据`
    );
  },
});

const columns: DataTableColumns<UserInfo> = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "邮箱",
    key: "email",
  },
  {
    title: "用户组",
    key: "group",
    render(row) {
      return getGroupName(row.group);
    },
  },
  {
    title: "操作",
    key: "actions",
    render(row, index) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "small",
          onClick: () => {
            dialog.warning({
              title: "编辑用户",
              content: () => userInfoForm(index),
              positiveText: "确定",
              onPositiveClick: () => setUserInfo(row),
            });
          },
        },
        { default: () => "编辑" }
      );
    },
  },
];
const userInfoForm = (index: number) => {
  const row = data.value[index];
  return h(
    NForm,
    {
      showLabel: true,
      showFeedback: false,
      labelPlacement: "left",
      labelWidth: "auto",
      size: "small",
      style: "display: flex;flex-direction: column;gap: 8px",
    },
    {
      default: () => [
        h(
          NFormItem,
          {
            path: "email",
            label: "邮箱",
          },
          {
            default: () =>
              h(NInput, {
                value: row.email,
                onUpdateValue(v) {
                  row.email = v;
                },
              }),
          }
        ),
        h(
          NFormItem,
          {
            path: "group",
            label: "用户组",
          },
          {
            default: () =>
              h(NSelect, {
                value: row.group,
                options: Array.from(group2Name, ([value, label]) => ({
                  label,
                  value,
                })),
                onUpdateValue(v) {
                  row.group = v;
                },
              }),
          }
        ),
      ],
    }
  );
};

const handlePageChange = async (currentPage: number) => {
  const { data: _data } = await useHttp.get<UserInfoResp>("/admin/user/info", {
    page: currentPage,
    pageSize: pagination.pageSize,
  });
  pagination.pageCount = Math.ceil(_data.total / (pagination.pageSize ?? 1));
  data.value = _data.list;
};
handlePageChange(1);
const setUserInfo = async (userData: UserInfo) => {
  console.log(userData)
  const { data } = await useHttp.post("/admin/user/info", userData);
  message.success(data);
};
</script>

<template>
  <n-data-table
    remote
    ref="table"
    class="info-table"
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    @update:page="handlePageChange"
  />
</template>

<style lang="scss" scoped>
.info-table {
  background-color: var(--n-td-color);
  padding-bottom: 8px;
}
</style>
