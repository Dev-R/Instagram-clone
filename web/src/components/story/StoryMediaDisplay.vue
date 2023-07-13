<template>
    <!-- Image -->
    <img
        v-if="story.items[0]?.type === 'image'" 
        class="rounded-lg sm:w-full sm:h-full h-screen w-screen" 
        :class="commentFocused"
        :src="story.items[0]?.mediaUrl" 
        :alt="story.items[0]?.title" />

    <!-- Video -->
    <video
        v-else
        :src="story.items[0].mediaUrl"
        :controls="false"
        :class="commentFocused"
        class="h-dynamic-screen sm:h-auto"
        loop
        defaultMuted
        playsinline
        oncontextmenu="return false"
        preload="auto">
    </video>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue'

import type {
    StoryCarousel
} from '@/common'

export default defineComponent({
    name: 'StoryMediaDisplay',
    setup(prop, context) {
        return {
            commentFocused: computed(() => prop.isCommentInputFocused ? 'brightness-50' : '')
        }
    },
    props: {
        story: {
            type: Object as () => StoryCarousel,
            required: true
        },
        isCommentInputFocused: {
            type: Boolean,
            required: true
        }
    }
})
</script>