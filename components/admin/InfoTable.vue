<script setup lang="ts">
import { EyeInvisibleTwotone } from "@vicons/antd";
import { RemoveRedEyeTwotone } from "@vicons/material";
import {
  NButton,
  NForm,
  NFormItem,
  NIcon,
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
const disableEye = ref(false);
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
    width: "10%",
  },
  {
    title() {
      return h(
        "div",
        {
          size: "20",
          style: {
            display: "flex",
            "justify-content": "space-between",
            alignItems: "center",
          },
        },
        {
          default: () => [
            "邮箱",
            h(
              NButton,
              {
                text: true,
                onClick: () => {
                  disableEye.value = !disableEye.value;
                },
              },
              {
                default: () =>
                  disableEye.value
                    ? h(NIcon, null, { default: () => h(EyeInvisibleTwotone) })
                    : h(NIcon, null, { default: () => h(RemoveRedEyeTwotone) }),
              }
            ),
          ],
        }
      );
    },
    key: "email",
    render: (row) => {
      if (disableEye.value) {
        return "*".repeat(row.email.length);
      } else {
        return row.email;
      }
    },
  },
  {
    title: "用户组",
    key: "group",
    width: "25%",
    render(row) {
      return getGroupName(row.group);
    },
  },
  {
    title: "操作",
    key: "actions",
    width: "10%",
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
  loading.value = true;
  const { data: _data } = await useHttp.get<UserInfoResp>("/admin/user/info", {
    page: currentPage,
    pageSize: pagination.pageSize,
  });
  loading.value = false;
  pagination.pageCount = Math.ceil(_data.total / (pagination.pageSize ?? 1));
  pagination.page = currentPage;
  data.value = _data.list;
};
handlePageChange(1);
const setUserInfo = async (userData: UserInfo) => {
  console.log(userData);
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
