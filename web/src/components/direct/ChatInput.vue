<template>
    <div 
        class="md:absolute sticky inset-x-3 bottom-6 
        sm:w-full rounded-full flex space-x-3">
        <div class="relative w-full">
            <div
                :class="{ 'hidden': modalValue }"
                @click="emitFileUpload">
                <SVGLoader
                    :icon="'gallery'" 
                    :class="'cursor-pointer absolute inset-y-0 right-14 \
                    flex items-center'" /> 
            </div>

            <div
                :class="{ 'hidden': modalValue }"
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
                class="z-50 bg-black border border-[#262626] text-white 
                rounded-full text-sm focus:outline-none
                block w-full p-2.5 lg:pb-0 resize-none"
                placeholder="Message..."
                :class="{ 'rounded-lg ': modalValue }"
                :value="modalValue" 
                @keyup.enter="emitSendMessage"/>
        </div>
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