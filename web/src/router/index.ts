import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'public',
      component: () => import('@/layouts/LayoutMain.vue'),
      children: [
        {
          path: '/',
          alias: '/home',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: { title: 'Home' }
        },
        {
          path: '/chat',
          name: 'chat',
          component: () => import('@/views/ChatView.vue'),
          meta: { title: 'Chat' }
        },
        {
          path: '/explore',
          name: 'explore',
          component: () => import('@/views/ExploreView.vue'),
          meta: { title: 'Explore' }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
          meta: { title: 'Profile' }
        },
        {
          path: '/reels',
          name: 'reels',
          component: () => import('@/views/ReelsView.vue'),
          meta: { title: 'Reels' }
        },
        { 
          path: '/:pathMatch(.*)*', 
          name: 'NotFound', 
          component: () => import('@/views/NotFound.vue')
      },
      ]
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('@/layouts/LayoutAuth.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
          meta : { title: 'Login' }
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: { title: 'Sign up' }
        }
      ]
    }

    
  ]
})

export default router
