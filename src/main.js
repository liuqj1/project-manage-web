import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/styles/index.scss'; // global css
import VCharts from 'v-charts';
import JsonExcel from 'vue-json-excel'


import App from './App.vue'
//顺序不能调换
import store from './store'
import router from './router'

import '@/icons/index.js'
import '@/permission' // permission control

Vue.config.productionTip = false
Vue.use(ElementUI, {size: "small"});
Vue.use(VCharts);
Vue.component('downloadExcel', JsonExcel)



console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_FLAG)
console.log(process.env)

new Vue({

  router,
  store,
  render: h => h(App)

}).$mount('#app')
