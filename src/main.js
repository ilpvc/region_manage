import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import {createPinia,PiniaVuePlugin} from 'pinia'
import router from "@/router";

Vue.config.productionTip = false
Vue.use(PiniaVuePlugin)

const pinia = createPinia()

new Vue({
  router,
  pinia,
  render: h => h(App),
}).$mount('#app')
