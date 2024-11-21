<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-20 19:09:14
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-21 01:12:26
-->
<script setup lang="ts">
const emit = defineEmits(["close"]);
const messgae = useMessage();
const isShow = ref(false);
const qrData = ref("");

let interval: NodeJS.Timeout

enum QrCodeStatus {
  Init = 0,
  Scanned = 1,
  Confirmed = 2,
  Success = 3,
  Failed = 4,
}

const showQrCode = async () => {
  isShow.value = true;
  const { data: result } = await useAPI<ResponseModel>("mihoyo/add");
  if (result.value?.code !== 0) {
    messgae.error(result.value?.message ?? "请求异常");
    emit("close");
    return;
  }
  const ticket = result.value.data.ticket;
  const deviceId = result.value.data.device_id;
  qrData.value = result.value.data.url;
  interval = setInterval(async () => {
    const { data: result } = await useAPI<ResponseModel>("mihoyo/check", {
      method: "POST",
      body: {
        ticket,
        device_id: deviceId,
      },
    });
    let isClose = false;
    const status = result.value?.data.status;
    switch (status) {
      case QrCodeStatus.Success:
        messgae.error("添加成功");
        isClose = true;
        break;
      case QrCodeStatus.Failed:
        messgae.error(result.value?.message ?? "请求异常");
        isClose = true;
        break;
      case null:
        messgae.error("请求异常");
        isClose = true;
        break;
    }
    if (isClose) {
      qrData.value = "";
      emit("close");
      clearInterval(interval);
    }
  }, 2000);
};

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="mihoyo-content">
    <NButton v-if="!isShow" @click="showQrCode"> 显示二维码 </NButton>
    <NSpin v-if="isShow && qrData == ''" size="large" />
    <NQrCode :size="200" v-if="isShow && qrData != ''" :value="qrData" />
  </div>
</template>

<style lang="css" scoped>
.mihoyo-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
</style>
