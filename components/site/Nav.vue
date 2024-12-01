<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 16:09:18
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-02 00:19:22
-->
<script setup lang="ts">
import {
  HomeTwotone,
  TaskTwotone,
  AdminPanelSettingsTwotone,
  MenuOpenOutlined,
  DarkModeTwotone,
  LightModeTwotone,
} from "@vicons/material";
import { UserGroup } from "~/types/user";
import { DeviceType } from "~/types/device";

const isClick = defineModel<boolean>("isClick", { default: false });

const device = useDevice();
const theme = useTheme();

const isAdmin = ref(false);
const isCollapse = ref(false);

const navList: {
  name: string;
  icon: Component;
  to: string;
}[] = [
  {
    name: "主页",
    to: "/home",
    icon: HomeTwotone,
  },
  {
    name: "我的任务",
    to: "/tasks",
    icon: TaskTwotone,
  },
];

const navAdminList: {
  name: string;
  icon: Component;
  to: string;
}[] = [
  {
    name: "管理",
    to: "/admin",
    icon: AdminPanelSettingsTwotone,
  },
];

onBeforeMount(() => {
  isAdmin.value = localStorage.getItem("group") == UserGroup.Admin.toString();
});

const collapse = () => {
  if (device.value !== DeviceType.Mobile) {
    isCollapse.value = !isCollapse.value;
  } else {
    isClick.value = false;
  }
};
</script>

<template>
  <div class="site-nav" :class="{ collapse: isCollapse === true }">
    <div class="top">
      <SiteNavItem
        :name="nav.name"
        :to="nav.to"
        :icon="nav.icon"
        :collapse="isCollapse"
        @click="isClick = false"
        v-for="nav in navList"
      />
      <ClientOnly v-for="nav in navAdminList">
        <SiteNavItem
          :name="nav.name"
          :to="nav.to"
          :icon="nav.icon"
          :collapse="isCollapse"
          v-if="isAdmin"
          @click="isClick = false"
        />
      </ClientOnly>
    </div>
    <div class="bottom">
      <SiteNavItem
        class="menu-collapse"
        :class="{ close: isCollapse === true }"
        :icon="MenuOpenOutlined"
        @click="collapse"
      />
      <NSwitch
        v-model:value="theme"
        checked-value="dark"
        unchecked-value="light"
        size="medium"
        style="margin-right: 5px"
      >
        <template #icon>
          <DarkModeTwotone v-if="theme == 'dark'" />
          <LightModeTwotone v-else />
        </template>
      </NSwitch>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.site-nav {
  .bottom,
  .top {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

  .bottom {
    .menu-collapse {
      &.close {
        transform: scaleX(-1);
      }
      & {
        width: 55px;
      }
    }

    & {
      bottom: 0px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &.collapse {
    width: 55px;
  }

  & {
    transition: width 0.3s;
    width: 180px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
