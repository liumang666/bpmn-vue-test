import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/about",
    name: "About",
    meta: { KeepAlive: true },
    component: () => import("@/views/about/index.vue"),
  },
  {
    path: "/other",
    name: "Other",
    meta: { KeepAlive: true },
    component: () => import("@/views/other/index.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
