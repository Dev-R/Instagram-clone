<template>
    <!-- Image -->
    <!-- TODO: Improve array accessing -->
    <img
        v-if="story.items[0]?.type === 'image'" 
        class="sm:rounded-lg sm:w-full sm:h-full w-screen" 
        :class="commentFocused"
        :src="story.items[0]?.mediaUrl" 
        :alt="story.items[0]?.title" />

    <!-- Video -->
    <video
        v-else
        :src="story.items[0].mediaUrl"
        :controls="false"
        :class="commentFocused"
        class="sm:h-auto"
        loop
        defaultMuted
        playsinline
        oncontextmenu="return false"
        preload="auto">
    </video>
</template>


<script setup lang="ts">
import { 
    computed 
} from 'vue'

import type {
    StoryCarousel
} from '@/common'


const prop = defineProps({
    story: {
            type: Object as () => StoryCarousel,
            required: true
        },
    isCommentInputFocused: {
        type: Boolean,
        required: true
    }
})
const commentFocused = computed(() => prop.isCommentInputFocused ? 'brightness-50' : '')
</script>