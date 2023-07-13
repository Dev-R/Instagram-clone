<template>
    <div class="relative sm:w-full sm:h-full h-screen w-screen transition-all duration-300 mx-auto">

        <StoryProgressBar 
            :progress-percentage="progressPercentage" />

        <StoryHeader 
            @on-modal-closed="$emit('onModalClosed')"
            :story="story"
            :active-story="activeStory"
            :active-story-type="activeStoryType" />

        <StoryMediaDisplay 
            :story="story"
            :is-comment-input-focused="isCommentInputFocused"/>

        <StoryCommentInput 
            @on-comment-focus="onCommentFocus"
            @on-like-status="$emit('onLikeStatus', $event)"
            @on-send-message="$emit('onSendMessage')"
            :modal-value="modalValue"
            :story="story" />

    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, type PropType } from 'vue'

import type { StoryCarousel } from '@/common'

import {
    StoryProgressBar,
    StoryMediaDisplay,
    StoryCommentInput,
    StoryHeader
}
from '@/components'

import { useToast } from 'vue-toastification'

// Story handlers
const isCommentInputFocused = ref(false)


// Props
const prop = defineProps({
    story: {
        type: Object as PropType<StoryCarousel>,
        required: true
    },
    activeStory: {
		type: null as unknown as PropType<HTMLVideoElement | HTMLImageElement | undefined>,
		required: true
	},
    activeStoryType: {
        type: Object as PropType<'Image' | 'Video' | null>,
		required: true
	},
    modalValue: {
        type: [String, Number, Array] as PropType<string | number | string[] | undefined>,
        default: undefined
    },
    progressPercentage: {
        type: Number,
        required: true
    },
    isCommentInputFocused: {
        type: Boolean,
        required: true
    }
})

// Emitters
defineEmits([
    'onStoryMute',
    'onStoryPlay',
    'onModalClosed',
    'onSendMessage',
    'onLikeStatus',
])


const onCommentFocus = () => {
    isCommentInputFocused.value = !isCommentInputFocused.value
}

/**
 * Pause story progress when comment input is focused
 */
    watchEffect(() => {
    isCommentInputFocused.value ? pauseStory() : resumeStory()
})

/**
 * TODO: 
 * Figure away to pass call parent function from child
 * Continue your journey..          
 */
</script>