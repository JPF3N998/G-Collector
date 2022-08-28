import { createRouter, createWebHashHistory } from "vue-router";

import Home from '@/views/Home.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/error",
    name: "Error",
    component: () => import('@/views/Error.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router;