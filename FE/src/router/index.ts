import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import admin from '@/router/admin/admin.router'
const routes: RouteRecordRaw[] | any[] = [
  { path: '/', redirect: { name: 'admin' } },
  ...admin,
]



const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router
