import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
  // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
  app.config.devtools = true
}
// Vue.prototype.$bus = new Vue()
app.use(store).use(router).mount('#app')
