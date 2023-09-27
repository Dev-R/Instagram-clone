<template>
    <div class="flex rounded-lg items-center space-x-2 w-full p-2 h-12 cursor-pointer
         justify-between sm:max-w-sm md:max-w-md sm:hover:bg-slate-1000">
        <div class="flex-inital flex-none">
            <img 
                :src="notification.profilePictureUrl" 
                class="w-14 h-14 rounded-full" />
        </div>

        <div class="flex flex-inital flex-row space-x-2">

            <span class="font-sans text-sm sm:text-md font-semibold text-white self-start">
                {{ notification.userName }}
            </span>

            <div class="font-sans text-sm sm:text-md font-semibold text-gray-300 text-ellipsis overflow-hidden self-start">
                {{ notification.caption }}
            </div>

        </div>

        <TheButton 
            @click="handleClick"
            :size="'sm'">
            <span class="sm:text-md sm:font-semibold">
                {{ buttionTitle }}
            </span>
        </TheButton>
        
    </div>
</template>

<script setup lang="ts">
import {
    type PropType,
    computed
} from 'vue'

import type {
    NotificationCard
} from '@/common'

import {
    TheButton
} from '@/components'

const prop = defineProps({
    notification: {
        type: Object as PropType<NotificationCard>,
        required: true
    }
})

const emit = defineEmits([
    'follow',
    'unfollow'
])

const emitFollow = (userName: NotificationCard['userName']) => {
    emit('follow', userName)
}

const emitUnfollow = (userName: NotificationCard['userName']) => {
    emit('unfollow', userName)
}

const handleClick = () => {
    prop.notification.isFollowing ? emitUnfollow(prop.notification.userName) : emitFollow(prop.notification.userName)
}

const buttionTitle = computed(() => {
    return prop.notification.isFollowing ? 'Unfollow' : 'Follow'
})
</script>
