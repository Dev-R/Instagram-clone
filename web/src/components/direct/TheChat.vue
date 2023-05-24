<template>
    <div 
        class="relative bg-black lg:max-w-[1320px] lg:basis-10/12 
        w-full h-screen border-l border-gray-800">

        <!-- Chat Header -->
        <ChatHeader
            @on-chat-back="$emit('onChatBack')"
            :current-user-name="currentUser.firstName"/>
            
        <!-- Chat Body -->
        <div class="flex flex-col lg:max-h-[850px] overflow-auto">
            <!-- C -->
            <div class="flex pt-5 space-x-2 justify-center">
                <span class="font-sans text-xs font-semibold text-gray-400">
                    November 2, 2020 12:44 am
                </span>
                <i  
                    v-if="isChatLoading"
                    class="fa-solid fa-spinner fa-spin fa-2xl text-slate-500">
                </i>
            </div>

            <!-- Chat Messages -->
            <ChatMessage
                :active-conversation="activeConversation"/>
        </div>


        <!-- Chat Input -->
        <ChatInput 
            @on-file-upload="$emit('onFileUpload')"
            @on-send-message="$emit('onSendMessage', $event)"
            :is-chat-empty="isChatEmpty" 
            :value="modalValue"/>
    </div>
</template>

<script lang="ts">
import type { Conversation, Viewer } from '@/common/models'
import { defineComponent, onMounted } from 'vue'
import ChatInput from './ChatInput.vue'
import ChatMessage from './ChatMessage.vue'
import ChatHeader from './ChatHeader.vue'


export default defineComponent({
    name: "TheChat",
    setup(prop) {
        onMounted(() => {
        });
        return {};
    },
    props: {
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
    },
    emits: [
        "onLikeIcon",
        "onSendMessage",
        "onFileUpload",
        "onChatBack",
    ],
    components: { ChatInput, ChatMessage, ChatHeader }
})
</script>