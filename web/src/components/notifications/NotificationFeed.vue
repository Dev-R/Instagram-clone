<template>
	<div class="flex flex-col space-y-8">
		<div 
			v-show="isNotificationSectionEmpty"
			class="text-md font-sans sm:text-xl text-gray-500 self-center">
			No Notifications yet.
		</div>      

		<UserProfileSkeleton 
			:is-loading="isLoading" />
        

		<NotificationCard 
			v-if="notifications"
			v-for="notification in notifications"
			:key="notification.userName"
			:notification="notification" />
	</div>  
</template>

<script setup lang="ts">
import {
    type PropType,
    computed
} from 'vue'

import {
    UserProfileSkeleton,
    NotificationCard
} from '@/components'


import type {
    NotificationCard as NotificationResult,
} from '@/common'

const prop = defineProps({
    notifications: {
        type: Array as PropType <NotificationResult[] | undefined> ,
        required: true
    },
    isLoading: Boolean,
    isEmpty: Boolean
})

const isNotificationSectionEmpty = computed(() => {
    return prop.isEmpty && !prop.isLoading
})
</script>