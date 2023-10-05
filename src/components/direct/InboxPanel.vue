<template>
	<div 
		:class="{ 'hidden': activeConversation }"
		class="bg-black sm:basis-1/2 lg:basis-1/5 md:block">
		<!-- Inbox Deader  -->
		<InboxHeader 
			:current-user="currentUser" />

		<!-- Inbox Rendering -->
		<div class="overflow-auto lg:max-h-[850px]">
			<!-- Inbox items-->
			<InboxMessages 
				:active-conversation-id="activeConversation?.uuid"
				:conversations="conversations"
				@on-select-conversation="$emit('onSelectConversation', $event as Conversation)" />
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    InboxMessages,
    InboxHeader
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
        type: Object as() => Conversation | undefined,
        required: true
    },
    currentUser: {
        type: Object as() => Viewer,
        required: true
    },
})

const emit = defineEmits(['onSelectConversation'])
</script>