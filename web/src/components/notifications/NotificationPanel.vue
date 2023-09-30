<template>
	<div class="bg-black scrollbar scrollbar-thumb-gray-900 md:p-0 p-2 w-full max-w-4xl mx-auto">
		<div 
			class="flex flex-col sm:border-r-2 border-gray-900 rounded-xl
            flex-nowrap sm:space-y-4 pt-2 md:pt-5 justify-self-end h-full
            md:ml-5 lg:ml-0">
			<NotificationsHeader />

			<NotificationFeed 
				:is-loading="isNotificationsLoading"
				:is-empty="isNotificationsEmpty"
				:notifications="notifications" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type {
    PropType,
} from 'vue'

import {
    NotificationsHeader,
    NotificationFeed
} from '@/components'

import type {
    NotificationCard as NotificationResult,
} from '@/common'


defineProps({
    notifications: {
        type: Array as PropType <NotificationResult[]> ,
        required: true
    },
    isNotificationsLoading: Boolean,
    isNotificationsEmpty: Boolean
})

</script>