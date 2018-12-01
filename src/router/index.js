import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/index'
import Pingjia from '@/pages/pingjia/pingjia'
import Shangjia from '@/pages/shangjia/shangjia'
import Detail from '@/pages/detail/Detail'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/pingjia',
    name: 'Pingjia',
    component: Pingjia
  },
  {
    path: '/shangjia',
    name: 'Shangjia',
    component: Shangjia
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  }
  ]
})
