<script setup lang="ts">
useHead({
  title: "首页",
});
</script>

<template>
  <NSpace vertical>
    <NCard title="签到信息">
      <div class="sign-card-content">
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
      </div>
    </NCard>

    <NCard title="公告"> 测试 </NCard>
  </NSpace>
</template>

<style lang="css" scoped>
.sign-card-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
