<template>
	<div class="bg-black h-screen">
		<section 
			class="container md:max-w-full mx-auto h-screen
			scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': false }">
			<div class="flex">
				<!-- Left bar: Navigation -->
				<div 
					class="basis-1/6 bg-black md:block hidden space-y-12 h-screen
					sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>

				<div class="bg-black scrollbar scrollbar-thumb-gray-900 md:p-0 p-2 w-full max-w-4xl mx-auto">
          
					<!-- Notification Section -->
					<div 
						class="flex flex-col sm:border-r-2 border-gray-900 rounded-xl
						flex-nowrap space-y-4 pt-2 md:pt-5 justify-self-end h-full
						md:ml-5 lg:ml-0">

                <!-- Section Title -->
                <div class="text-xl font-sans sm:text-2xl text-white font-bold hidden sm:block">
                    Notifications
                </div>

                <div class="flex pt-4 border-t-2 border-gray-900">
                    <div class="text-md font-sans sm:text-xl text-white font-bold">
                        This Week
                    </div>
                </div>

                <div class="flex flex-col space-y-8">

                  <div 
                      v-show="isNotificationsEmpty && !isNotificationsLoading"
                      class="text-md font-sans sm:text-xl text-gray-500 self-center">
                      No Notifications yet.
                  </div>      

                  <UserProfileSkeleton 
                      :is-loading="isNotificationsLoading" />
                  

                  <NotificationCard 
                      v-for="notification in notifications"
                      :key="notification.userName"
                      :notification="notification" />
 
                </div>  

					</div>

				</div>

			</div>
		</section>

	</div>
</template>
 
<script lang="ts">

import {
	onMounted,
	defineComponent,
	ref,
	computed,
  onUnmounted
} from 'vue'


import {
	NavBarMain,
	CommentModal,
	SVGLoader,
	PostCard as PostCardModal,
  PostCoverCard,
  TheInput,
  UserProfileSkeleton,
  SearchCard,
  SearchBar,
  TheButton,
  NotificationCard
} from '@/components'

import type {
  NotificationCard as NotificationResult,
} from '@/common'

export default defineComponent({
  name: 'Search',
  setup() {

    const notifications = ref<NotificationResult[]>([])
    const isNotificationsLoading = ref<boolean>(false)


    /**
     * Assigns demo search results.
     * For demo only.
     */
    const assignDemoNotifications = () => {
      notifications.value = [
        {
          userName: 'John Doe',
          type: 'follow',
          isFollowing: false,
          caption: 'John Doe followed you.',
          profilePictureUrl: 'https://loremflickr.com/1024/1280/cat'
        },
        {
          userName: 'Jane Doe',
          type: 'follow',
          caption: 'Jane Doe followed you.',
          isFollowing: false,
          profilePictureUrl: 'https://loremflickr.com/1024/1280/dog'
        }
      ]
    }

    const loadNotifications = () => {
      isNotificationsLoading.value = true
      setTimeout(() => {
        assignDemoNotifications()
        isNotificationsLoading.value = false
      }, 1000)
    }

    /**
     * Adds the resize event listener.
     */
    const addResizeListener = () => {
      window.addEventListener('resize', onWidthChange)
    }

    /**
     * Removes the resize event listener.
     */
    const removeResizeListener = () => {
      window.removeEventListener('resize', onWidthChange)
    }

    /**
     * Updates the window width on resize.
     */
    const onWidthChange = () => {
      windowWidth.value = window.innerWidth
    }

    // Computed
    const windowWidth = ref(window.innerWidth) // Current window width
    const screenSizeType = computed(() => (windowWidth.value < 550 ? 'xs' : false))
    // const isNotificationsLoading = computed(() => notifications.value.length > 0)
    const isNotificationsEmpty = computed(() => notifications.value.length === 0)

    // Lifecycle Hooks
    onMounted(() => {
      addResizeListener()
      loadNotifications()
    })

    onUnmounted(() => {
      removeResizeListener()
    })

    return {
      notifications,
      isNotificationsLoading,
      isNotificationsEmpty
    }
  },
  components: {
    NavBarMain,
    SVGLoader,
    CommentModal,
    PostCardModal,
    PostCoverCard,
    TheInput,
    TheButton,
    UserProfileSkeleton,
    SearchCard,
    SearchBar,
    NotificationCard
},
})

</script>

<style scoped>
</style>