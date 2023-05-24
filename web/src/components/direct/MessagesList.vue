<template>
    <div 
        v-if="conversations"
        v-for="(convo, index) of conversations"
        :key="index"
        class="flex flex-col md:block pl-2 pr-2"
        @click="emitSelectConversation(convo)">
        <div 
            :class="{ 'bg-slate-1100': convo.uuid === activeConversationId }"
            class="flex p-3 space-x-3 hover:bg-slate-1100 w-full cursor-pointer">
            <!-- Profile Image -->
            <img 
                :src="convo.user.profilePictureUrl"
                class="cursor-pointer h-14 w-14 rounded-full shadow-lg" />


            <!-- Username / Chat / Date -->
            <div class="flex flex-col self-center space-y-2 pb-3">
                <span class="font-sans text-sm font-semibold text-white self-start">
                    {{ convo.user.userName }}
                </span>

                <div class="flex flex-row space-x-1">
                    <span class="font-sans text-xs font-semibold text-gray-400">
                        {{ convo.lastMessage }}
                    </span>

                    <div class="font-sans text-xs font-semibold text-gray-500">
                        •
                    </div>

                    <div class="font-sans font-semibold text-xs text-gray-500 justify-self-end">
                        {{ convo.timeSinceLastMessage }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { Conversation, Viewer } from '@/common/models'
import { defineComponent, onMounted } from 'vue'


export default defineComponent({
name: 'MessagesList',
setup(prop, context) {

    /**
     * Emit new message
     */
    const emitSelectConversation = (conversation: Conversation) => {
        context.emit('onSelectConversation', conversation)
    }

    onMounted(() => {
    })

    return {
        emitSelectConversation
     }
},
props: {
    conversations: { 
        type: Object as () => Conversation[] | undefined,
        required: true
    },
    activeConversationId: {
        type: String as () => Conversation['uuid'] | undefined,
        default: undefined
    }
},
emits: ['onSelectConversation']
})
</script>