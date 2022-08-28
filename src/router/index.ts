import { createRouter, createWebHashHistory } from "vue-router";

import Home from '@/views/Home.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/unsupported",
    name: "Unsupported",
    component: () => import('@/views/Unsupported.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router;