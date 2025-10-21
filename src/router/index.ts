import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabBarComponent from '@/views/TabBarComponent.vue';
import LoginPage from '@/pages/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  // {
  //   path: '/',
  //   component: TabBarComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirect: 'home'
  //     },
  //     {
  //       path: 'home',
  //       component: () => import('@/pages/HomePage.vue')
  //     },
  //     {
  //       path: 'agendamentos',
  //       component: () => import("@/pages/AgendamentoPage.vue")
  //     },
  //     {
  //       path: 'filas',
  //       component: () => import("@/pages/FilaPage.vue")
  //     }
  //   ]
  // }
  { path: '/login', component: LoginPage },
  { path: '/', redirect: '/login' },
  {
    path: '/menu/',
    component: TabBarComponent,
    meta: { requiresAuth: true },
    children: [
      { path: '/inicio', component: () => import('@/pages/HomePage.vue') },
      { path: '/agendamentos', component: () => import('@/pages/AgendamentoPage.vue') },
      { path: '/filas', component: () => import('@/pages/FilaPage.vue') },
      { path: '/perfil', component: () => import('@/pages/ProfilePage.vue') }
    ]
  },
  // fallback
  // { path: '/:catchAll(.*)', redirect: '/' }


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
