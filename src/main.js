import Vue from 'vue'
import App from './App.vue'
import "lib-flexible"
import router from './routes'
import Vuex from 'vuex'
import 'es6-promise/auto'
import store from './store.js'
import auth from './utils/auth'
import http from './utils/http'
import toast from './utils/toast'

Vue.use(Vuex)

Vue.prototype.$auth = auth
Vue.prototype.$http = http
Vue.prototype.$toast = toast

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
