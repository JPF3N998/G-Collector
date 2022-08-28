import { createRouter, createWebHashHistory } from "vue-router";

import Home from '@/views/Home.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/unsupported",
    name: "unsupported",
    component: () => import('@/views/Unsupported.vue')
  },
  {
    path:"/empty",
    name:"empty",
    component: () => import('@/views/Empty.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router;