import { createRouter, createWebHistory } from 'vue-router'
import { usePhotoStore } from '@/stores'
import NProgress from 'nprogress'

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
          component: () => import('@/views/Home.vue'),
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
          component: () => import('@/views/Profile.vue'),
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
          path: '/search',
          name: 'search',
          component: () => import('@/views/SearchView.vue'),
          meta: { title: 'Search' }
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: () => import('@/views/NotificationView.vue'),
          meta: { title: 'Notifications' }
        },
        {
          path: '/settings',
          name: 'setting',
          component: () => import('@/views/SettingView.vue'),
          meta: { title: 'Setting' }
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
          alias: '/accounts',
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: { title: 'Login' }
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/auth/SignupView.vue'),
          meta: { title: 'Sign up' }
        },
        {
          path: 'reset',
          name: 'reset',
          component: () => import('@/views/auth/ResetPassword.vue'),
          meta: { title: 'Reset Password' }
        },
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

  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }

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

  // Complete the animation of the route progress bar.
  NProgress.done()
})
export default router
