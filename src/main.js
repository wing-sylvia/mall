import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'

import FastClick from 'fastclick'
// import VueLazyLoad from 'vue-lazyload'

// import toast from 'components/common/toast';

FastClick.attach(document.body)

const app = createApp(App)
app.config.globalProperties.$bus = new mitt();
// app.use(toast)
app.use(store).use(router).mount('#app')
