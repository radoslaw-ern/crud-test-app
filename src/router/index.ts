import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/trucks',
      name: 'Trucks',
      component: () => import('@/views/TrucksList.vue')
    },
    {
      path: '/trucks/:action/:truckId?',
      props: true,
      name: 'Edit truck',
      component: () => import('@/views/EditTruck.vue')
    }
  ]
})

export default router
