import { createRouter, createWebHistory } from "vue-router"
import { items } from "../items"

const capitalize = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`

const routes = [
  { path: "/:pathMatch(.*)*", component: () => import("./pages/not-found.vue") },
  { path: "/", component: () => import("./pages/index.vue") },
  {
    path: "/i",
    children: items.map(i => ({
      path: i.id,
      name: i.title || capitalize(i.id),
      component: () => import(`./pages/items/${i.id}.vue`),
    })),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  document.title =
    String(to.name || "Ceigh's Experimental Interactive Gallery House")
  next()
})
