// @ts-nocheck
import {
  createRouter as _createRouter,
  createWebHashHistory,
} from 'vue-router';
import { appRoutes } from './routes';
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from './routes/base';
// Auto generates routes from vue files under ../views
// https://vitejs.dev/guide/features.html#glob-import
// const views = import.meta.glob('../views/*.vue')

const routes = [
  {
    path: '/home',
    component: () => import('../views/home.vue'),
  },
  ...appRoutes,
  REDIRECT_MAIN,
  NOT_FOUND_ROUTE,
];

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: createWebHashHistory('/'),
    routes,
    scrollBehavior() {
      return { top: 0 };
    },
  });
}
