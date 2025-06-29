<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-16 16:12:16
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-22 16:09:30
-->
<script setup lang="ts">
const token = useCookie("token")
onMounted(() => {
  token.value ? navigateTo("/home") : navigateTo("/login");
});
</script>
<template></template>
