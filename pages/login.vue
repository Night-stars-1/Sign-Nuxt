<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-19 19:00:06
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-04 00:46:56
-->
<script setup lang="ts">
import md5 from "md5";
import type { FormInst, FormItemRule } from "naive-ui";
useHead({
  title: "登录",
});

const isLogin = ref(true);
watch(isLogin, () => {
  useHead({
    title: isLogin.value ? "登录" : "注册",
  });
});

const message = useMessage();
const bgImage = useBackground();
const token = useCookie("token");
const localBgImage = "https://t.alcy.cc/fj";
onBeforeMount(() => {
  bgImage.value = localBgImage;
});

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  name: "",
  password: "",
  reenteredPassword: "",
  email: "",
  code: "",
});
const rules = {
  password: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("请输入密码");
      } else if (value.length < 6) {
        return new Error("密码至少6位");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  reenteredPassword: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordSame,
      message: "两次密码输入不一致",
      trigger: ["blur", "password-input"],
    },
  ],
  email: {
    required: true,
    message: "请输入邮箱",
    trigger: ["input"],
  },
  code: {
    required: true,
    message: "请输入邮箱验证码",
    trigger: ["input"],
  },
};
const codeTime = ref(0);

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === formValue.value.password;
}

const api = async (path: string) => {
  const { data } = await useHttp.post(`user/${path}`, {
    password: md5(formValue.value.password),
    email: formValue.value.email,
  });
  if (import.meta.dev) token.value = data.token;
  localStorage.setItem("group", data.group);
  navigateTo("/home");
};

const confirm = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      api(isLogin.value ? "login" : "register");
    }
  });
};

const getCode = async () => {
  codeTime.value = 60;
  const timer = setInterval(() => {
    codeTime.value--;
    if (codeTime.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
  const { data } = await useHttp.post(`user/code`, {
    email: formValue.value.email,
  });
  message.success(data);
};
</script>

<template>
  <div class="main" align="center" justify="center">
    <div class="login-card">
      <div class="login-bg">
        <div
          class="login-bg-img"
          :style="{ backgroundImage: `url(${localBgImage})` }"
        />
      </div>
      <div class="login-content">
        <h1 class="title">{{ isLogin ? "登录" : "注册" }}</h1>
        <NForm
          ref="formRef"
          class="login-form"
          :model="formValue"
          :rules="rules"
          size="medium"
        >
          <NFormItem label="邮箱" path="email">
            <NInput v-model:value="formValue.email" placeholder="输入邮箱" />
          </NFormItem>
          <NFormItem label="密码" path="password">
            <NInput
              id="password"
              v-model:value="formValue.password"
              type="password"
              show-password-on="click"
              placeholder="输入密码"
            />
          </NFormItem>
          <NFormItem
            first
            path="reenteredPassword"
            label="重复密码"
            v-if="!isLogin"
          >
            <NInput
              v-model:value="formValue.reenteredPassword"
              :disabled="!formValue.password"
              type="password"
              @keydown.enter.prevent
              placeholder="重复密码"
            />
          </NFormItem>
          <NFormItem label="验证" path="code" v-if="!isLogin">
            <NInputGroup>
              <NInput
                v-model:value="formValue.code"
                placeholder="输入邮箱验证码"
              />
              <NButton type="primary" ghost @click="getCode">
                {{ codeTime ? `已发送 (${codeTime}s)` : "获取验证码" }}
              </NButton>
            </NInputGroup>
          </NFormItem>
        </NForm>
        <NButton class="login-btn" type="info" @click="confirm">
          {{ isLogin ? "登录" : "注册" }}
        </NButton>
        <div class="login-text" @click="isLogin = !isLogin">
          {{ !isLogin ? "登录账号" : "注册账号" }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  .login-card {
    .login-bg,
    .login-content {
      .login-bg-img {
        background-size: cover;
        height: 100%;
        width: 200%;
      }

      .title {
        + .login-form {
          width: 80%;
        }

        & {
          color: var(--text-color);
          margin-bottom: 10px;
        }
      }

      .login-btn {
        width: 80%;
        margin-top: 5px;
      }
      .login-text {
        &:hover {
          cursor: pointer; /* 鼠标悬停时显示手形点击图标 */
          text-decoration: underline;
        }

        & {
          width: 80%;
          text-align: left;
          margin-bottom: 35px;
          margin-top: 5px;
          color: var(--text-color);
        }
      }

      & {
        flex: 1;
        background-color: var(--base-background-color);
      }
    }

    .login-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    & {
      display: flex;
      width: max(700px, 50%);
      height: 500px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
        0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    }
  }

  & {
    display: grid;
    align-items: center;
    justify-items: center;
    height: 100vh;
  }
}

@media (max-width: 950px) {
  .main .login-card {
    .login-bg {
      flex: 3;
    }
    .login-content {
      flex: 7;
    }
    & {
      width: max(360px, 45%);
      height: 80%;
      flex-direction: column;
    }
  }
}
</style>
