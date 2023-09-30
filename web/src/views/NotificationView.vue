<template>
	<div class="bg-black h-screen">
		<section 
			class="container md:max-w-full mx-auto h-screen
			scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': false }">
			<div class="flex">
				<!-- Left bar: Navigation -->
				<div 
					class="basis-1/6 bg-black md:block hidden space-y-12
					sticky top-0 border-r border-gray-900 h-screen">
					<NavBarMain />
				</div>

				<div class="bg-black scrollbar scrollbar-thumb-gray-900 md:p-0 p-2 w-full max-w-4xl mx-auto">
					<!-- Notification Section -->
					<div 
              class="flex flex-col sm:border-r-2 border-gray-900 rounded-xl
              flex-nowrap sm:space-y-4 pt-2 md:pt-5 justify-self-end h-full
              md:ml-5 lg:ml-0">

                <!-- Section Title -->
                <div class="text-xl font-sans sm:text-2xl text-white font-bold hidden sm:block">
                    Notifications
                </div>

                <div 
                     class="text-md font-sans sm:text-xl text-white font-bold sm:pt-4 
                     sm:border-t-2 border-gray-900 text-center sm:text-left">
                    Latest
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
 
<script setup lang="ts">
import {
    ref,
    computed,
    onMounted
} from 'vue'

import {
    NavBarMain,
    UserProfileSkeleton,
    NotificationCard
} from '@/components'

import type {
    NotificationCard as NotificationResult,
} from '@/common'


const notifications = ref<NotificationResult[]>([])
const isNotificationsLoading =ref<boolean>(false)


/**
 * Assigns demo search results.
 * For demo only.
 */
const assignDemoNotifications = () => {
    notifications.value = [{
            userName: 'John Doe',
            type: 'follow',
            isFollowing: false,
            caption: 'Started following you.',
            profilePictureUrl: 'https://loremflickr.com/1024/1280/cat'
        },
        {
            userName: 'Jane Doe',
            type: 'follow',
            caption: 'Started following you.',
            isFollowing: false,
            profilePictureUrl: 'https://loremflickr.com/1024/1280/dog'
        }
    ]
}
/**
 * Loads notifications.
 * For demo only.
 */
const loadNotifications = () => {
    isNotificationsLoading.value = true
    setTimeout(() => {
        assignDemoNotifications()
        isNotificationsLoading.value = false
    }, 1000)
}
// Computed
// const isNotificationsLoading = computed(() => notifications.value.length > 0)
const isNotificationsEmpty = computed(() => notifications.value.length === 0)

// Lifecycle Hooks
onMounted(() => {
    loadNotifications()
})
</script>