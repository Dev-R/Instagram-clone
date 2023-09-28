<template>
    <div 
        class="absolute inset-x-3 md:bottom-2 bottom-8 
        rounded-full flex md:space-x-3">
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
                @keyup.enter="emitSendMessage"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import SVGLoader from '../basics/SVGLoader.vue'

export default defineComponent({
    name: "ChatInput",
    setup(prop, context) {
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

        onMounted(() => {
        });
        
        return {
            emitLikeIcon,
            emitSendMessage,
            emitFileUpload
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
    components: { SVGLoader }
})
</script>