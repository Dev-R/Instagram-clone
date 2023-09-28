<template>
    <div class="absolute inset-x-3 md:bottom-2 bottom-8 rounded-full flex md:space-x-3">
            <div class="cursor-pointer absolute inset-y-0 left-0 \
                    flex items-center">
                <span class="relative">
                    <EmojiPickerModal 
                        @selectEmoji="appendEmoji" />
                </span>
            </div>

            <div
                :class="{ 'hidden': !isChatEmpty }"
                @click="emitFileUpload">
                <SVGLoader
                    :icon="'gallery'" 
                    :class="'cursor-pointer absolute inset-y-0 right-14 \
                    flex items-center'" /> 
            </div>

            <div
                :class="{ 'hidden': !isChatEmpty }"
                @click="emitLikeIcon()">
                <SVGLoader
                    :icon="'like'" 
                    :class="'cursor-pointer absolute inset-y-0 right-4 \
                    flex items-center'" />     
            </div>                             
                
            <textarea
                ref="textArea"
                tabindex="1"
                rows="1"
                maxlength="2200"
                type="text"
                class="bg-black border border-[#262626] text-white 
                rounded-full text-sm focus:outline-none
                block w-full p-2.5 resize-none"
                placeholder="Message..."
                :class="{ 'rounded-lg ': !isChatEmpty }"
                :value="modalValue" 
                @keyup.enter="emitSendMessage" />
    </div>
</template>

<script lang="ts">
import { 
    defineComponent, 
    onMounted, 
    ref 
} from 'vue';

import {
    EmojiPickerModal,
    SVGLoader
} from '@/components';

import type {
    Emoji
} from '@/common';
export default defineComponent({
    name: "ChatInput",
    setup(prop, context) {
        // DOM Refs
        const textArea = ref<HTMLInputElement | null>()
        /**
         * Emit new message
         */
        const emitSendMessage = (payload: KeyboardEvent) => {
            context.emit("onSendMessage", payload);
        };
        /**
         * Emit like icon
         */
        const emitLikeIcon = () => {
            context.emit("onLikeIcon");
        };
        /**
         * Emit file upload
         */
        const emitFileUpload = () => {
            context.emit("onFileUpload");
        };
        /**
         * Append emoji to textarea
         */
        const appendEmoji = (emoji: Emoji) => {
            if (textArea.value) {
                textArea.value.focus();
                textArea.value.value += emoji.i;
            }
        };
        onMounted(() => {
        });

        return {
            emitLikeIcon,
            emitSendMessage,
            emitFileUpload,
            appendEmoji,
            textArea
        };
    },
    props: {
        modalValue: {
            type: String as () => string | number | string[] | undefined,
            default: undefined
        },
        isChatEmpty: {
            type: Boolean,
            required: true
        }
    },
    emits: [
        "update:modelValue",
        "onLikeIcon",
        "onSendMessage",
        "onFileUpload"
    ],
    components: { SVGLoader, EmojiPickerModal }
})
</script>