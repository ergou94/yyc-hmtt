import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Form, Field } from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import 'postcss-pxtorem'
import '@/styles/index.less'
// 一次性导入filters/index.js按需导出全部导出来,作为obj的属性
import * as obj from '@/filters'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.use(Form)
Vue.use(Field)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
