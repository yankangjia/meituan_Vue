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


Vue.filter('dateFormat', function(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      }
  }
  return fmt;
  // 用法
  // let date = new Date()
  // dateFormat("YYYY-mm-dd HH:MM", date)
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
