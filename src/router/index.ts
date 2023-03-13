import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add_design',
    name: 'add',
    component: () => import(/* webpackChunkName: "about" */ '../views/DesignView.vue')
  },
  {
    path: '/edit_design/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/DesignView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
