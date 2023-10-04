<template>
	<NotificationPanel 
		:notifications="notifications"
		:is-notifications-loading="isNotificationsLoading"
		:is-notifications-empty="isNotificationsEmpty" />
</template>
	
<script setup lang="ts">
import {
    ref,
    computed,
    onMounted
} from 'vue'

import {
    NotificationPanel
} from '@/components'

import {
    SampleGenerator
} from '@/data'

import type {
    NotificationCard as NotificationResult,
} from '@/common'

const notifications = ref<NotificationResult[] | undefined>(undefined)
const isNotificationsLoading =ref<boolean>(false)


/**
 * Assigns demo search results.
 * For demo only.
 */
const assignDemoNotifications = () => {
    notifications.value = SampleGenerator.generateRandomNotifications(5, 20)
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
const isNotificationsEmpty = computed(() => notifications.value?.length === 0)

// Lifecycle Hooks
onMounted(() => {
    loadNotifications()
})
</script>