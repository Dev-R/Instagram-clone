<template>
    <div 
        class="text-center border-t 
        md:hidden block border-slate-1100 mt-2">
        <ul 
            class="flex space-x-14 flex-wrap 
            justify-around pt-3 pl-4 pr-4">
            <div 
                v-for="(element, index) of userProfileStats"
                :key="index"
                class="flex flex-col sm:hover:cursor-pointer"
                @click="element.action">
                <span class="text-sm subpixel-antialiase text-white">
                    {{ element.count }}
                </span>

                <span class="text-sm subpixel-antialiase text-gray-400">
                    {{ element.title }}
                </span>
            </div>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type {
    PropType
} from 'vue'

import {
    ModalName,
    type ModalType,
    type User,
} from '@/common'

const prop = defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    }
})
const emit = defineEmits(['openModal'])

// Data
const userProfileStats = [{
        title: 'posts',
        count: prop.user.mediaItems.length, // TODO: Change mediaCount to postCount
        action: () => {},
    },
    {
        title: 'followers',
        count: prop.user.followerCount,
        action: () => emitModal(ModalName.FOLLOW, 'Followers'),
    },
    {
        title: 'following',
        count: prop.user.followingCount,
        action: () => emitModal(ModalName.FOLLOW, 'Following'),
    }
]

/**
 *  Emits a modal event to open a modal
 * @param modalType The type of modal to open (Follow, Settings, etc.)
 * @param modalTitle The title of the modal to open (Followers, Following, etc.)
 */
const emitModal = (modalType: ModalType, modalTitle: string) => {
    emit('openModal', {
        modalType,
        modalTitle
    })
}
</script>