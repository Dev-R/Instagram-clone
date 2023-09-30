<template>
	<div class="bg-black h-screen">
		<section 
			class="container md:max-w-full mx-auto h-screen
				scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': false }">
			<div class="flex">
				<div 
					class="basis-1/6 bg-black md:block hidden space-y-12
						sticky top-0 border-r border-gray-900 h-screen">
					<NavBarMain />
				</div>

				<NotificationPanel 
					:notifications="notifications"
					:is-notifications-loading="isNotificationsLoading"
					:is-notifications-empty="isNotificationsEmpty" />
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
    NotificationPanel
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