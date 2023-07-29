<template>
    <div class="relative sm:w-full sm:h-full w-screen transition-all duration-300 mx-auto bg-gray-700">

        <StoryProgressBar 
            :progress-percentage="progressPercentage" />

        <StoryHeader 
            ref="storyHeaderRef"
            @on-modal-closed="$emit('onModalClosed')"
            @on-pause-story="pauseStory"
            @on-resume-story="resumeStory"

            :story="story"
            :is-comment-input-focused="isCommentInputFocused"
            :active-story-media="activeStoryMedia"
            :active-story-type="activeStoryType" />

        <StoryMediaDisplay 
            :story="story"
            :is-comment-input-focused="isCommentInputFocused"/>

        <StoryCommentInput 
            @on-comment-focus="onCommentFocus"
            @on-like-status="$emit('onLikeStatus', $event)"
            @on-send-message="$emit('onSendMessage', $event)"
            :story="story" />

    </div>
</template>

<script setup lang="ts">
import { 
    ref,
    watchEffect, 
    inject, 
    type PropType 
} from 'vue'

import type {
    StoryCarousel,
    StoryType,
    StoryMedia
} from '@/common'

import {
    StoryProgressBar,
    StoryMediaDisplay,
    StoryCommentInput,
    StoryHeader
}
from '@/components'

// Props
const prop = defineProps({
    story: {
        type: Object as PropType<StoryCarousel> ,
        required: true
    },
    activeStoryMedia: {
        type: null as unknown as PropType<StoryMedia> ,
        required: true
    },
    activeStoryType: {
        type: null as unknown as PropType<StoryType> ,
        required: true
    },
    progressPercentage: {
        type: Number,
        required: true
    }
})

// Emitters
defineEmits([
    'onModalClosed',
    'onSendMessage',
    'onLikeStatus',
])

// Accessing parent functions
const triggerPauseStory = inject('pauseStory') as() => void
const triggerResumeStory = inject('resumeStory') as() => void

// Refs
const isCommentInputFocused = ref(false)
const storyHeaderRef = ref<InstanceType<typeof StoryHeader>>()

// Methods
const resumeStory = () => {
    const storyHeaderMethods = storyHeaderRef.value
    if (storyHeaderMethods) {
        triggerResumeStory()
        storyHeaderMethods.playStory()
        prop.activeStoryType === 'Video' && storyHeaderMethods.playStoryVideo()
    }
}

const pauseStory = () => {
    const storyHeaderMethods = storyHeaderRef.value
    if (storyHeaderMethods) {
        triggerPauseStory()
        storyHeaderMethods.pauseStory()
        storyHeaderMethods.pauseStoryVideo()
    }
}

const onCommentFocus = () => {
    isCommentInputFocused.value = !isCommentInputFocused.value
}

// Watchers
/**
 * Pause story progress when comment input is focused
 */
watchEffect(() => {
    isCommentInputFocused.value ? pauseStory() : resumeStory()
})
</script>