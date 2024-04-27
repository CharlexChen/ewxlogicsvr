<template>
    <div>msg: {{ msg }}</div>
    <div>countValue: {{ countValue }}</div>
    <div>username: {{ username }}</div>
    <HelloWorld />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getUserInfo } from '@/api/user';
import HelloWorld from '@/components/HelloWorld.vue';
import { useUserStore } from '@/store/user-store';
import { useHomeStore } from '@/store/home-store';
import { storeToRefs } from 'pinia';
// 【示例】状态管理数据提取
const userStore = useUserStore();
const { username } = storeToRefs(userStore);
const homeStore = useHomeStore();
const { countValue } = storeToRefs(homeStore);
const msg = ref('web/pages/home.vue');
onMounted(() => {
    // 【示例】请求数据
    getUserInfo().then((resp) => {
        console.log('getUserInfo response: ', resp);
    });
    userStore.fetchInfo();
})
</script>
<style lang="less">
</style>