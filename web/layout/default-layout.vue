<template>
    <a-layout class="arco-layout">
        <a-layout-sider collapsible breakpoint="xl">
            <!-- <div class="logo" /> -->
            <div class="menu-title">常用工具箱</div>
            <a-menu :default-open-keys="['1']" :default-selected-keys="['0_3']" :style="{ width: '100%' }"
                @menu-item-click="onClickMenuItem">
                <a-menu-item key="0_1">
                    <IconHome></IconHome>
                    Menu 1
                </a-menu-item>
                <a-menu-item key="0_2">
                    <IconCalendar></IconCalendar>
                    Menu 2
                </a-menu-item>
                <a-menu-item key="0_3">
                    <IconCalendar></IconCalendar>
                    Menu 3
                </a-menu-item>
                <a-sub-menu key="1">
                    <template #title>
                        <IconCalendar></IconCalendar> Navigation 1
                    </template>
                    <a-menu-item key="1_1">Menu 1</a-menu-item>
                    <a-menu-item key="1_2">Menu 2</a-menu-item>
                    <a-sub-menu key="2" title="Navigation 2">
                        <a-menu-item key="2_1">Menu 1</a-menu-item>
                        <a-menu-item key="2_2">Menu 2</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="3" title="Navigation 3">
                        <a-menu-item key="3_1">Menu 1</a-menu-item>
                        <a-menu-item key="3_2">Menu 2</a-menu-item>
                        <a-menu-item key="3_3">Menu 3</a-menu-item>
                    </a-sub-menu>
                </a-sub-menu>
                <a-sub-menu key="4">
                    <template #title>
                        <IconCalendar></IconCalendar> Navigation 4
                    </template>
                    <a-menu-item key="4_1">Menu 1</a-menu-item>
                    <a-menu-item key="4_2">Menu 2</a-menu-item>
                    <a-menu-item key="4_3">Menu 3</a-menu-item>
                </a-sub-menu>
            </a-menu>
            <!-- trigger -->
            <template #trigger="{ collapsed }">
                <IconCaretRight v-if="collapsed"></IconCaretRight>
                <IconCaretLeft v-else></IconCaretLeft>
            </template>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="padding-left: 20px;">
                Header123
            </a-layout-header>
            <a-layout style="padding: 24px 24px 0 24px;">
                <!-- <a-breadcrumb :style="{ margin: '16px 0' }">
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item>List</a-breadcrumb-item>
                    <a-breadcrumb-item>App</a-breadcrumb-item>
                </a-breadcrumb> -->
                <a-layout-content>
                    <PageLayout />
                </a-layout-content>
                <a-layout-footer>Footer</a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script setup lang="ts">
import PageLayout from './page-layout.vue';
import { Message } from '@arco-design/web-vue';
import {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
} from '@arco-design/web-vue/es/icon';
import { useRoute } from 'vue-router';
import { appRoutes } from '../router/routes';
// import { computed } from 'vue';
// import type { RouteMeta } from 'vue-router';
// import { AppRouteRecordRaw } from '../router/routes/types';

// interface IMenuItem {
//     key: string;
//     name?: string;
//     meta?: RouteMeta;
//     children?: AppRouteRecordRaw[];
// }
const route = useRoute();
// const router = useRouter();
function onClickMenuItem(key: string) {
    console.log('router', appRoutes, route);
    Message.info({ content: `You select ${key}`, showIcon: true });
}
// const menuList = computed(() => {
//     const arr: IMenuItem[] = [];
//     appRoutes.forEach((ele) => {
//         if (ele.meta?.hideInMenu) return ;
//         arr.push({
//             key: ele.path.indexOf('/') === 0 ? ele.path : `/${ele.path}`,
//         });
//     });
// });
</script>
<style lang="less" scoped>
.arco-layout {
    width: 100%;
    height: 100%;
    // height: 500px;
    background: var(--color-fill-2);
    border: 1px solid var(--color-border);
}

.arco-layout :deep(.arco-layout-sider) .logo {
    height: 32px;
    margin: 12px 8px;
    background: rgba(255, 255, 255, 0.2);
}

.arco-layout :deep(.arco-layout-sider-light) .logo {
    background: var(--color-fill-2);
}

.menu-title {
    height: 32px;
    margin: 12px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.arco-layout :deep(.arco-layout-header) {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
}

.arco-layout :deep(.arco-layout-footer) {
    height: 48px;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
}

.arco-layout :deep(.arco-layout-content) {
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
    padding: 15px;
}

.arco-layout :deep(.arco-layout-footer),
.arco-layout :deep(.arco-layout-content) {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    // text-align: center;
}
</style>