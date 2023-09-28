<template>
        <div class="flex flex-col">

            <div class="flex bg-black px-2 py-5 lg:h-16 w-full space-x-2 justify-between">
                <SVGLoader 
                    @click="onPageBack"
                    :class="'rotate-[270deg] cursor-pointer sm:hidden'"
                    :icon="'back-arrow'" />

                <div class="cursor-pointer font-sans text-xl font-bold text-white pt-1">
                    {{ currentUser?.userName }}
                </div>
                    
                <div 
                    class="flex cursor-pointer"
                    @click="emitNewMessage()">
                    <SVGLoader 
                        :icon="'new-message'" />
                </div>
            </div>

            <div class="flex bg-black pl-5 pr-5 pb-2 w-full space-x-2 justify-between">
                <div class="flex">
                    <div class="cursor-pointer font-sans text-md font-bold text-white pt-1">
                        Messages
                    </div>

                    <div class="flex space-x-4 cursor-pointer">
                    </div>
                </div>

                <div></div>
                    
                <div class="cursor-pointer font-sans text-xs font-semibold text-[#949494] pt-1">
                    Requests
                </div>
            </div>

        </div>
</template>

<script lang="ts">
import { 
    defineComponent,
    onMounted 
} from 'vue'

import { 
    useRouter
} from 'vue-router'

import {
    SVGLoader
} from '@/components'

import type { 
    Viewer 
} from '@/common'

export default defineComponent({
    name: "MessagesHeader",
    setup(prop, context) {

        // Services
        const router = useRouter(); 

        /**
         * Emit new message
         */
        const emitNewMessage = () => {
            context.emit("onNewMessage");
        };
        
        const onPageBack = () => {
            router.back();
        };
        
        return {
            emitNewMessage,
            onPageBack
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