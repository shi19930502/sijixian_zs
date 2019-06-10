import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect:'index',
      component: () => import('@/view/index/index.vue')
    },
    {
      path: '/index',
      component: () => import('@/view/index/index.vue')
    },
    {
      path: '/priceChart',
      name:'priceChart',
      component: () => import('@/view/priceChart/priceChart.vue')
    },
  ]
})
