import { createRouter, createWebHistory } from 'vue-router'
import { usePhotoStore } from '@/stores'

const ROOT_ROUTE = '/home'

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
          path: '/stories',
          name: 'stories',
          component: () => import('@/views/StoryView.vue'),
          meta: { title: 'Reels' }
        },
        {
          path: '/direct',
          name: 'direct',
          component: () => import('@/views/DirectView.vue'),
          meta: { title: 'Direct' }
        },
        {
          path: '/reels',
          name: 'reels',
          component: () => import('@/views/ReelsView.vue'),
          meta: { title: 'Reels' }
        },
        {
          path: '/create',
          name: 'create',
          children: [
            {
              path: 'style',
              name: 'style',
              component: () => import('@/components/modals/PhotoModal.vue'),
              meta: { title: 'Create Image' }
            },
            {
              path: 'story',
              name: 'story',
              component: () => import('@/views/errors/NotFound.vue'),
              meta: { title: 'Create Story' }
            },
          ],
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/views/errors/NotFound.vue')
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
          meta: { title: 'Login' }
        },
        // {
        //   path: 'signup',
        //   name: 'signup',
        //   component: () => import('@/views/auth/LoginView.vue'),
        //   meta: { title: 'Sign up' }
        // }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      component: () => import("@/views/errors/NotFound.vue"),
      meta: { title: 'Not Found' }
    }


  ]
})


/**
 * RouterGuard
 */
router.beforeEach(async (to, from, next) => {
  const photoStore = usePhotoStore()

  // User shouldn't be able to access create route without preview image
  if (to.path.startsWith('/create') && !photoStore.previewImage) {
    console.log('Here')
    return next({ name: 'home' })
  }

  return next()
})

router.afterEach((to, from, failure) => {
  if (to.meta.title && failure?.from.path !== ROOT_ROUTE) {
    // Only update page title if no failure
    document.title = `PhotoFlow - ${ to.meta.title }`
  }
})
export default router
