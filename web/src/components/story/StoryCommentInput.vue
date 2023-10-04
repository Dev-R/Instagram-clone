<template>
    <!-- Comment Form -->
    <div class="absolute inset-x-3 bottom-6 w-11/12 rounded-full h-11 flex space-x-3">
        <input
            @focus="onCommentFocus"
            @focusout="onCommentFocus"
            @keyup.enter="onSendMessage"
            tabindex="1"
            v-model="commentMessageInput"
            type="text" 
            class="z-50 bg-transparent border border-gray-300 text-white 
            focus:outline-none text-sm rounded-full block w-full p-2.5 placeholder:text-white placeholder:font-semibold" 
            :placeholder="placeHolder" />
        <span 
            @click="onLikeStatus(story)"
            class="self-center hover:cursor-pointer hover:scale-90">
            <SVGLoader 
                v-if="story.hasLiked" :icon="'like'"/>
            
            <SVGLoader 
                v-else :icon="'unlike'"/>
        </span>

        <SVGLoader 
            :icon="'direct'" :class="'self-center hover:cursor-pointer hover:scale-90'" /> 

    </div>
</template>


<script setup lang="ts">
import { 
    computed, 
    ref
} from 'vue'

import { useToast } from 'vue-toastification'

import type {
    StoryCarousel
} from '@/common'

import {
    SVGLoader,
} from '@/components'

const emit = defineEmits([
    'onSendMessage',
    'onCommentFocus',
    'onLikeStatus',
])

const prop = defineProps({
    story: {
        type: Object as () => StoryCarousel,
        required: true
    }
})

const commentMessageInput = ref<string | null>(null)

// Services
const toast = useToast()

/**
 * Emit Comment Focus event
 */
const onCommentFocus = () => {
    emit("onCommentFocus")
}

/**
 * Emit Story Send event
 */
const onSendMessage = () => {
    const message = commentMessageInput.value
    commentMessageInput.value = '' // Clear message area 
    // Prevent spacing values
    if (message?.trim() != '') {
        toast.info('Sent')
        emit("onSendMessage", message)
    }
}

/**
 * Emit Story like event
 */
    const onLikeStatus = (story: StoryCarousel) => {
    emit("onLikeStatus", story)
}

const placeHolder = computed(() => 'Reply to' + ' ' + prop.story.userName)

</script>