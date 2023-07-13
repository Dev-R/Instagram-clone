<template>
    <!-- Comment Form -->
    <div class="absolute inset-x-3 bottom-6 w-11/12 rounded-full h-11 flex space-x-3">
        <input
            @focus="onCommentFocus"
            @focusout="onCommentFocus"
            @keyup.enter="onSendMessage"
            tabindex="1"
            type="text" 
            class="z-50 bg-transparent border border-gray-300 text-white focus:outline-none text-sm rounded-full
            block w-full p-2.5" 
            :placeholder="placeHolder" 
            v-model="modalValue" />
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


<script lang="ts">
import { defineComponent, computed } from 'vue'

import type {
    StoryCarousel
} from '@/common'

export default defineComponent({
    name: 'StoryCommentInput',
    setup(prop, context) {
        

        /**
         * Emit Comment Focus event
         */
        const onCommentFocus = () => {
            context.emit("onCommentFocus")
        }

        /**
         * Emit Story Send event
         */
        const onSendMessage = () => {
            context.emit("onSendMessage")
        }

        /**
         * Emit Story like event
         */
         const onLikeStatus = (story: StoryCarousel) => {
            context.emit("onLikeStatus", story)
        }

        return {
            onCommentFocus,
            onSendMessage,
            onLikeStatus,
            placeHolder: computed(() => 'Reply to' + ' ' + prop.story.userName)
        }
    },
    props: {
        modalValue: {
            type: String as () => string | number | string[] | undefined,
            default: undefined
        },
        story: {
            type: Object as () => StoryCarousel,
            required: true
        }
    },
    emits: [
        'onSendMessage',
        'onCommentFocus',
		'onLikeStatus',
	],
})
</script>