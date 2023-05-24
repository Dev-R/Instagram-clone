<template>
    <div 
        :class="{ 'hidden': activeConversation }"
        class="bg-black basis-1/5 md:block">
        <!-- Conversation Rendering Header  -->
        <MessagesHeader 
            :current-user="currentUser" />


        <!-- Conversations rendering -->

        <div class="overflow-auto lg:max-h-[850px]">
            <!-- Conversation OverView items-->
            <MessagesList 
                @on-select-conversation="$emit('onSelectConversation', $event as Conversation)"
                :active-conversation-id="activeConversation?.uuid"
                :conversations="conversations" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import SVGLoader from '../basics/SVGLoader.vue'
import type { Conversation, Viewer } from '@/common/models'
import MessagesList from './MessagesList.vue'
import MessagesHeader from './MessagesHeader.vue'


export default defineComponent({
    name: "TheMessages",
    setup(prop, context) {
        onMounted(() => {
        });
        return {};
    },
    props: {
        conversations: {
            type: Object as () => Conversation[] | undefined,
            required: true
        },
        /**
         * TODO: Fix Vue Warn; Invalid prop: type check failed for prop "activeConversation". Expected Object, got Null
         */
        activeConversation: {
            type: Object as () => Conversation | null,
            required: true
        },
        currentUser: {
            type: Object as () => Viewer,
            required: true
        },
    },
    emits: [
        'onSelectConversation'
    ],
    components: { SVGLoader, MessagesList, MessagesHeader }
})
</script>