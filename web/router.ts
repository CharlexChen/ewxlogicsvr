// @ts-nocheck
import {
  createRouter as _createRouter,
  createWebHashHistory,
} from 'vue-router';

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.glob('./pages/*.vue')

const routes = [
  {
    path: '/home',
    component: () => import('./pages/home.vue'),
  },
];

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: createWebHashHistory('/'),
    routes,
  });
}
