<template>
	<div 
		class="relative bg-black lg:basis-10/12 
        w-full h-screen border-l border-gray-800">
		<ChatHeader
			:current-user-name="currentUser.firstName"
			@on-chat-back="$emit('onChatBack')" />
            
		<div class="flex flex-col lg:max-h-[850px] overflow-auto">
			<div class="flex pt-5 space-x-2 justify-center">
				<span class="font-sans text-xs font-semibold text-gray-400">
					November 2, 2020 12:44 am
				</span>
				<i  
					v-if="isChatLoading"
					class="fa-solid fa-spinner fa-spin fa-2xl text-slate-500">
				</i>
			</div>

			<ChatMessage
				:active-conversation="activeConversation" />
		</div>

		<ChatInput 
			:is-chat-empty="isChatEmpty"
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
        type: Object as () => Conversation,
        required: true
    },
    currentUser: {
        type: Object as () => Viewer,
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
});

defineEmits([
    "onLikeIcon",
    "onSendMessage",
    "onFileUpload",
    "onChatBack",
]);
</script>