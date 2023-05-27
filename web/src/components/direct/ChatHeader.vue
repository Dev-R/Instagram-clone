<template>
    <div 
        class="flex lg:h-16 w-full space-x-2 md:justify-between p-3
        items-center border-slate-700 border-b">
        <div 
            class="rotate-[270deg] md:hidden hover:cursor-pointer"
            @click="emitChatBack">
            <SVGLoader 
                :icon="'back-arrow'" 
                :class="'group-hover:scale-110'" />
        </div>

        <div class="flex space-x-2 items-center">
            <img 
                src="https://loremflickr.com/1024/1080/car"
                class="cursor-pointer h-10 w-10 rounded-full shadow-lg" />

            <div class="cursor-pointer font-sans text-sm font-bold text-white pt-1">
                {{ currentUserName }}
            </div>
        </div>

        <div 
            class="flex space-x-4 cursor-pointer md:visible invisible">
            <SVGLoader 
                @click="emitAudioCall"
                :icon="'audio-call'" />
                <SVGLoader 
                @click="emitVideoCall"
                :icon="'video-call'" />
                <SVGLoader 
                @click="emitChatInfo"
                :icon="'chat-info'" />
        </div>
    </div>

</template>

<script lang="ts">
import type { Conversation, Viewer } from '@/common/models'
import { defineComponent, onMounted } from 'vue'
import SVGLoader from '../basics/SVGLoader.vue'


export default defineComponent({
    name: "ChatHeader",
    setup(prop, context) {
        /**
         * Emit Audio Call
         */
        const emitAudioCall = () => {
            context.emit("onAudioCall");
        };
        /**
         * Emit Video Call
         */
        const emitVideoCall = () => {
            context.emit("onVideoCall");
        };
        /**
         * Emit Chat Info
         */
        const emitChatInfo = () => {
            context.emit("onChatInfo");
        };
        /**
         * Emit Chat Info
         */
        const emitChatBack = () => {
            context.emit("onChatBack");
        };
        onMounted(() => {
        });
        return {
            emitAudioCall,
            emitChatInfo,
            emitVideoCall,
            emitChatBack
        };
    },
    props: {
        currentUserName: {
            type: Object as () => Conversation["user"]["firstName"],
            required: true
        }
    },
    emits: [
        "onAudioCall",
        "onVideoCall",
        "onChatInfo",
        "onChatBack"
    ],
    components: { SVGLoader }
})
</script>