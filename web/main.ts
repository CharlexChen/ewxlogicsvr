import { createVueApp } from "./create";
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/global.less';
const { app, router: _router } = createVueApp();
app.use(ArcoVue);
app.mount('#app');