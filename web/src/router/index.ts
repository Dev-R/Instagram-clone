import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  useModalManagerStore,
  usePhotoStore
} from '@/stores'
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
          meta: {}
        },
        {
          path: '/explore',
          name: 'explore',
          component: () => import('@/views/Explore.vue'),
          meta: {}
        },
        {
          path: '/:username?',
          name: 'profile', // TODO: Change to dynamic
          component: () => import('@/views/Profile.vue'),
          meta: {}
        },
        {
          path: '/stories',
          name: 'stories',
          component: () => import('@/views/Story.vue'),
          meta: {}
        },
        {
          path: '/direct',
          name: 'direct',
          component: () => import('@/views/Direct.vue'),
          meta: {}
        },
        {
          path: '/reels',
          name: 'reels',
          component: () => import('@/views/Reels.vue'),
          meta: {}
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/views/Search.vue'),
          meta: {}
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: () => import('@/views/Notification.vue'),
          meta: {}
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/views/Setting.vue'),
          meta: {}
        },
        {
          path: '/p/:id?',
          name: 'post',
          component: () => import('@/views/Post.vue'),
          meta: {}
        },
        {
          path: '/create',
          name: 'create',
          children: [
            {
              path: 'style',
              name: 'style',
              component: () => import('@/components/core/modals/PhotoModal.vue'),
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
          component: () => import('@/views/auth/Login.vue'),
          meta: { title: 'Login' }
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/auth/Signup.vue'),
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
  const modalStoreManager = useModalManagerStore()

  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }

  // User shouldn't be able to access create route without preview image
  if (to.path.startsWith('/create') && !photoStore.previewImage) {
    return next({ name: 'home' })
  }

  // Close any open modals
  if (modalStoreManager.isAnyModalOpen) {
    modalStoreManager.closeModal()
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
