<template>
    <div 
        v-show="emptyTabBarBodyMessage.isEmpty"
        class="flex flex-col space-y-2 self-center pt-14 h-screen">
        <i 
            class="text-slate-1100 text-6xl pb-2"
            :class="emptyTabBarBodyMessage.icon"></i>

        <div class="flex flex-col space-y-4">
            <span class="font-sans text-3xl text-white font-extrabold">
                {{ emptyTabBarBodyMessage.top }}
            </span>

            <span class="font-sans text-sm text-white font-normal">
                {{ emptyTabBarBodyMessage.body }}
            </span>

            <span class="font-sans text-sm text-sky-600 font-semibold">
                {{ emptyTabBarBodyMessage.footer }}
            </span>
        </div>
        <i class="fa-regular fa-bookmark"></i>
    </div>
</template>

<script setup lang="ts">
import {
    type PropType,
    computed,
} from 'vue'

import {
    type NavBarTabs,
    ProfileTab
} from '@/common'

const prop = defineProps({
    currentActiveTab: {
        type: String as PropType<NavBarTabs>,
        required: true
    },
    isSavedTabEmpty: {
        type: Boolean as PropType<boolean>,
        required: true
    },
    isTaggedTabEmpty: {
        type: Boolean as PropType<boolean>,
        required: true
    },
    isPostTabEmpty: {
        type: Boolean as PropType<boolean>,
        required: true
    },
    isPeedTabEmpty: {
        type: Boolean as PropType<boolean>,
        required: true
    }
})

/**
 * Return message based on current active tab for empty tab bar body
 */
const emptyTabBarBodyMessage = computed(() => {
    switch (prop.currentActiveTab) {
        case ProfileTab.Posts:
            return {
                icon: 'fa-solid fa-photo-film',
                top: 'Share Photos',
                body: 'When you share photos, they will appear on your profile.',
                footer: 'Share your first photo',
                isEmpty: prop.isPostTabEmpty
            }
        case ProfileTab.Peeds:
            return {
                icon: 'fa-solid fa-photo-film',
                top: 'Share Photos',
                body: 'When you share photos, they will appear on your profile.',
                footer: 'Share your first photo',
                isEmpty: prop.isPeedTabEmpty
            }
        case ProfileTab.Tagged:
            return {
                icon: 'fa-solid fa-users-viewfinder',
                    top: 'Start Saving',
                    body: 'Save photos and videos to your collection.',
                    footer: 'Add to collection',
                    isEmpty: prop.isTaggedTabEmpty

            }
        case ProfileTab.Saved:
            return {
                icon: 'fa-regular fa-bookmark',
                    top: 'Photos of you',
                    body: "When people tag you in photos, they'll appear here.",
                    footer: '',
                    isEmpty: prop.isSavedTabEmpty
            }
        default:
            return {}
    }
})
</script>