import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/',
  name: 'Dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: '/',
      name: 'DashboardHome',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        locale: 'menu.dashboard.home',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/flowList',
      name: 'DashboardFlowList',
      component: () => import('@/views/dashboard/flowList.vue'),
      meta: {
        locale: 'menu.dashboard.flow',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/flow',
      name: 'DashboardFlow',
      component: () => import('@/views/dashboard/flow.vue'),
      meta: {
        locale: 'menu.dashboard.flow',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};

export default DASHBOARD;
