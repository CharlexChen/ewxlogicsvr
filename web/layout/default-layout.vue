<template>
    <a-layout class="arco-layout">
        <a-layout-sider collapsible breakpoint="xl">
            <!-- <div class="logo" /> -->
            <div class="menu-title">
                业务数据工具箱
            </div>
            <!-- @menu-item-click="onClickMenuItem" -->
            <a-menu :selected-keys="selectedKey" :auto-open-selected="true" style="height: 100%;width:100%;">
                <template v-for="item in menuTree">
                    <a-sub-menu
                        v-if="item && item?.children && item?.children.length !== 0"
                        :key="item?.name"
                    >
                        <template #icon><IconHome></IconHome></template>
                        <template #title>{{ t(item?.meta?.locale || '') }}</template>
                        <a-menu-item v-for="ele in item.children" :key="ele?.name" @click="goto(ele)">
                            <template #icon><IconHome></IconHome></template>
                            {{ t(ele?.meta?.locale || '') }}
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item v-else-if="item" :key="item.name" @click="goto(item)">
                        <template #icon><IconHome></IconHome></template>
                        {{ t(item?.meta?.locale || '') }}
                    </a-menu-item>
                </template>
                <!-- <a-menu-item key="0_1">
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
                </a-sub-menu> -->
            </a-menu>
            <!-- trigger -->
            <template #trigger="{ collapsed }">
                <IconCaretRight v-if="collapsed"></IconCaretRight>
                <IconCaretLeft v-else></IconCaretLeft>
            </template>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="padding-left: 20px;">
                Header
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
// import { Message } from '@arco-design/web-vue';
// import { appRoutes } from '../router/routes';
import PageLayout from './page-layout.vue';
import {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
} from '@arco-design/web-vue/es/icon';
import { useRoute, useRouter, RouteRecordRaw, RouteMeta } from 'vue-router';
import useMenuTree from './use-menu-tree';
import { useI18n } from 'vue-i18n';
import { openWindow, regexUrl } from '@/utils/tool';
import { ref } from 'vue';
import { listenerRouteChange } from '@/utils/route-listener';

const router = useRouter();
const { t } = useI18n();
const {
    menuTree,
} = useMenuTree();
const route = useRoute();
// function onClickMenuItem(key: string) {
//     console.log('router', appRoutes, route);
//     Message.info({ content: `You select ${key}`, showIcon: true });
// }
const openKeys = ref<string[]>([]);
const selectedKey = ref<string[]>([]);
const findMenuOpenKeys = (target: string) => {
    const result: string[] = [];
    let isFind = false;
    const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) {
            isFind = true;
            result.push(...keys);
            return;
        }
        if (item.children?.length) {
            item.children.forEach((el) => {
                backtrack(el, [...keys, el.name as string]);
            });
        }
    };
    menuTree.value.forEach((el: any) => {
        if (isFind) return; // Performance optimization
        backtrack(el, [el.name as string]);
    });
    return result;
};
listenerRouteChange((newRoute) => {
    const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
    if (requiresAuth && (!hideInMenu || activeMenu)) {
        const menuOpenKeys = findMenuOpenKeys((activeMenu || newRoute.name) as string);

        const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
        openKeys.value = [...keySet];

        selectedKey.value = [
            activeMenu || menuOpenKeys[menuOpenKeys.length - 1],
        ];
    }
}, true);
const goto = (item: RouteRecordRaw) => {
    // Open external link
    if (regexUrl.test(item.path)) {
        openWindow(item.path);
        selectedKey.value = [item.name as string];
        return;
    }
    // Eliminate external link side effects
    const { hideInMenu, activeMenu } = item.meta as RouteMeta;
    if (route.name === item.name && !hideInMenu && !activeMenu) {
        selectedKey.value = [item.name as string];
        return;
    }
    // Trigger router change
    router.push({
        name: item.name,
    });
};
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
    padding: 24px;
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