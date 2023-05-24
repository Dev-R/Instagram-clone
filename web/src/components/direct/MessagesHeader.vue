<template>
        <div class="flex flex-col">
            <div 
                class="flex bg-black p-5 lg:h-16 
                w-full space-x-2 justify-between">
                <div class="flex">
                    <div class="cursor-pointer font-sans 
                    text-xl font-bold text-white pt-1">
                        {{ currentUser?.userName }}
                    </div>

                    <div class="flex space-x-4 cursor-pointer">
                    </div>
                </div>

                <div>
                </div>
                    
                <div 
                    class="flex cursor-pointer"
                    @click="emitNewMessage()">
                    <SVGLoader :icon="'new-message'" />
                </div>
            </div>

            <div 
                class="flex bg-black pl-5 pr-5 pb-2 w-full space-x-2 justify-between">
                <div class="flex">
                    <div class="cursor-pointer font-sans text-md font-bold text-white pt-1">
                        Messages
                    </div>

                    <div class="flex space-x-4 cursor-pointer">
                    </div>
                </div>

                <div>
                </div>
                    
                <div class="cursor-pointer font-sans text-xs font-semibold text-[#949494] pt-1">
                    Requests
                </div>
            </div>
        </div>
    
</template>

<script lang="ts">
import type { Viewer } from '@/common/models'
import { defineComponent, onMounted } from 'vue'
import SVGLoader from '../basics/SVGLoader.vue'


export default defineComponent({
    name: "MessagesHeader",
    setup(prop, context) {
        /**
         * Emit new message
         */
        const emitNewMessage = () => {
            context.emit("onNewMessage");
        };
        onMounted(() => {
        });
        return {
            emitNewMessage
        };
    },
    props: {
        currentUser: {
            type: Object as () => Viewer,
            required: true
        }
    },
    emits: ["onNewMessage"],
    components: { SVGLoader }
})
</script>