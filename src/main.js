// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import '@/assets/styles/css/reset.css'
import '@/assets/styles/css/border.css'
import '@/assets/styles/css/iconfont.css'
import store from './store/index.js'
import Navigation from 'vue-navigation'
Vue.use(Navigation, {
  router
})
FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
