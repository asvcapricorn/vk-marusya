import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/genres',
      name: 'genres',
      component: () => import('../views/GenresView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/movie/:movieId',
      name: 'movie',
      component: () => import('../views/MovieView.vue'),
    },
  ],
})

export default router
