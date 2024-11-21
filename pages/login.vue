<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-19 19:00:06
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-20 13:02:41
-->
<script setup lang="ts">
import type { FormInst, FormItemRule } from "naive-ui";

const isLogin = ref(true);
const bgImage = useBackground();
const token = useCookie("token");
const message = useMessage();
const localBgImage =
  "https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg";
onBeforeMount(() => {
  bgImage.value = localBgImage;
});

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  name: "",
  password: "",
  reenteredPassword: "",
  email: "",
});
const rules = {
  name: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error("请输入用户名");
      } else if (value.length < 5) {
        return new Error("用户名至少5位");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
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
};

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === formValue.value.password;
}

const api = async (path: string) => {
  const { data: result } = await useAPI<ResponseModel>(`user/${path}`, {
    method: "POST",
    body: {
      username: formValue.value.name,
      password: formValue.value.password,
    },
  });
  if (!result.value) return;
  if (result.value.code === 0) {
    token.value = result.value.data.token;
    navigateTo("/home");
  } else {
    message.error(result.value.message);
  }
};

const confirm = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      api(isLogin.value ? "login" : "register");
    }
  });
};
</script>

<template>
  <div class="main" align="center" justify="center">
    <div class="login-card">
      <div class="login-bg">
        <div
          class="login-bg-img"
          :style="{ backgroundImage: `url(${localBgImage})` }"
        ></div>
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
          <NFormItem label="用户名" path="name">
            <NInput v-model:value="formValue.name" placeholder="输入用户名" />
          </NFormItem>
          <NFormItem label="密码" path="password">
            <NInput
              id="password"
              v-model:value="formValue.password"
              type="password"
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
          <NFormItem label="邮箱" path="email" v-if="!isLogin">
            <NInput v-model:value="formValue.email" placeholder="输入邮箱" />
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
        margin-bottom: 10px;

        + .login-form {
          width: 80%;
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
        }
      }

      & {
        flex: 1;
        background-color: #e5effd;
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
