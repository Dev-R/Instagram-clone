<template>
	<div 
		:class="{ 'hidden': activeConversation }"
		class="bg-black basis-1/5 md:block">
		<!-- Conversation Header  -->
		<MessagesHeader 
			:current-user="currentUser" />

		<!-- Conversations Rendering -->
		<div class="overflow-auto lg:max-h-[850px]">
			<!-- Conversation OverView items-->
			<MessagesList 
				:active-conversation-id="activeConversation?.uuid"
				:conversations="conversations"
				@on-select-conversation="$emit('onSelectConversation', $event as Conversation)" />
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    MessagesList,
    MessagesHeader
} from '@/components'

import type {
    Conversation,
    Viewer
} from '@/common'

defineProps({
    conversations: {
        type: Object as() => Conversation[] | undefined,
        required: true
    },
    activeConversation: {
        type: Object as() => Conversation | null,
        required: true
    },
    currentUser: {
        type: Object as() => Viewer,
        required: true
    },
})

const emit = defineEmits(['onSelectConversation'])
</script>