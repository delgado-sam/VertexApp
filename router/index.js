import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/index.vue'
import Clients from '@/pages/clients.vue'
import ClientDetails from '@/pages/[id].vue'
import AboutUs from '@/pages/about.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients,
  },
  {
    path: '/clients/:id',
    name: 'client-details',
    component: ClientDetails,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutUs,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
