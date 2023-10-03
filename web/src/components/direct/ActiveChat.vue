<template>
	<div 
		class="relative bg-black lg:basis-10/12 
        w-full h-dynamic-screen sm:h-screen border-l border-gray-800">
		<ChatHeader
			:viewer="activeConversation?.user"
			@on-chat-back="$emit('onChatBack')" />

        <div class="flex pt-5 space-x-2 justify-center">
            <span 
                v-if="!isChatLoading"
                class="font-sans text-xs font-semibold text-gray-400">
                {{ formatedDate(activeConversation?.timeSinceLastMessage) }}
            </span>
            <i  
                v-else
                class="fa-solid fa-spinner fa-spin fa-2xl text-slate-500 mt-4">
            </i>
        </div>

        <div class="flex flex-col lg:max-h-[850px] overflow-auto">
            <ChatMessage
                v-if="activeConversation"
                :is-chat-loading="isChatLoading"
                :active-conversation="activeConversation" />
        </div>

        <ChatInput 
            :is-chat-empty="isChatEmpty"
            :is-chat-loading="isChatLoading"
            :value="modalValue"
            @on-file-upload="$emit('onFileUpload')"
            @on-like-icon="$emit('onLikeIcon')" 
            @on-send-message="$emit('onSendMessage', $event)" />
	</div>
</template>

<script setup lang="ts">
import {
    ChatInput,
    ChatMessage,
    ChatHeader
} from '@/components'

import type {
    Conversation,
    Viewer
} from '@/common'


defineProps({
    activeConversation: {
        type: Object as () => Conversation | undefined,
        required: true
    },
    isChatLoading: {
        type: Boolean,
        required: true
    },
    isChatEmpty: {
        type: Boolean,
        required: true
    },
    modalValue: {
        type: String as () => string | number | string[] | undefined,
        default: undefined
    }
})

defineEmits([
    "onLikeIcon",
    "onSendMessage",
    "onFileUpload",
    "onChatBack",
])

const formatedDate = (date: string | undefined) => {
    if (!date) return ''
	return new Date(date).toLocaleDateString()
}
</script>