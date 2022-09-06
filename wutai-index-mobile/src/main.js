import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'u-reset.css'

import Vant from 'vant';
import 'vant/lib/index.css';

import filter from "./filter";

Vue.use(Vant);

Vue.config.productionTip = false;

let filterKeys = Object.keys(filter);

// Vue.filter('secondToMin',filter.secondToMin);

filterKeys.forEach(ele=>{
  Vue.filter(ele,filter[ele]);
})





new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
