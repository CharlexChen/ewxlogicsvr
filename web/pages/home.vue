<template>
    <div>{{ msg }}</div>
    <div>{{ countValue }}</div>
    <HelloWorld />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getUserInfo } from '@/api/user';
import HelloWorld from '@/components/HelloWorld.vue';
import { useHomeStore } from '@/store/home-store';
import { storeToRefs } from 'pinia';
// 【示例】状态管理数据提取
const homeStore = useHomeStore();
const { countValue } = storeToRefs(homeStore);
const msg = ref('web/pages/home.vue');
onMounted(() => {
    // 【示例】请求数据
    getUserInfo().then((resp) => {
        console.log('getUserInfo response: ', resp);
    });
})
</script>