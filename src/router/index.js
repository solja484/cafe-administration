import Vue from 'vue'
import VueRouter from 'vue-router'
import OrdersPage from '../views/OrdersPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'OrdersPage',
    component: OrdersPage
  },
  {
    path: '/kitchen',
    name: 'KitchenPage',
    component: () => import( '../views/KitchenPage.vue')
  },
  {
    path: '/menu',
    name: 'MenuPage',
    component: () => import( '../views/MenuPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
