import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store/'
import './config/rem'

import $ from 'jquery'

import axios from 'axios'
Vue.prototype.$axios = axios;

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})


new Vue({
  router,
  store
}).$mount('#app')
