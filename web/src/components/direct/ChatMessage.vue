<template>
    <div 
        v-for="(dialog, index) of activeConversation?.dialogs"
        :key="index"
        class="flex pt-5 space-x-2 m-2"
        :class="{
            'justify-end': dialog.isSentByViewer,
        }">
        <img 
            v-if="!dialog.isSentByViewer"
            src="https://loremflickr.com/1024/1080/car"
            class="cursor-pointer h-6 w-6 rounded-full shadow-lg self-end" />

        <p 
            v-if="dialog.text"
            class="break-words p-3 border border-[#1f1f1f] rounded-lg text-white lg:text-sm text-xs max-w-xs"
            :class="{ 
                'm-2 bg-gray-1100 md:bg-sky-1100': dialog.isSentByViewer, 
                'md:bg-[#262626]': !dialog.isSentByViewer 
            }">
            {{ dialog.text }}
        </p>

        <img 
            v-else-if="dialog.img"
            :src="dialog.img"
            class="cursor-pointer w-60 h-40 rounded-lg" />

        <div
            v-if="index === activeConversation.dialogs.length - 1" 
            id="last-element">
        </div>
    </div>

</template>

<script lang="ts">
import type { Conversation, Viewer } from '@/common/models'
import { defineComponent, onMounted } from 'vue'


export default defineComponent({
name: 'ChatMessage',
setup(prop, context) {

    onMounted(() => {
    })

    return {
     }
},
props: {
    activeConversation: { 
        type: Object as () => Conversation,
        required: true
    }
},
emits: []
})
</script>