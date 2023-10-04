<template>
    <div
        class="md:grid place-content-center bg-black border-l border-slate-800
        lg:basis-9/12 w-full md:h-full h-screen hidden text-center">
        <div class="flex flex-col space-y-1">
            <SVGLoader
                :icon="'direct-intro'" 
                :class="'cursor-pointer self-center'" /> 

            <div class="text-white md:text-xl text-xs pt-3">
                Your messages
            </div>

            <div class="text-[#a8a8a8] lg:text-sm text-xs pb-3">
                Send private photos and messages to a friend or group.
            </div>

            <button 
                @click="$emit('onSendMessageModal')"
                type="button" 
                class="text-white bg-[#0095f6] hover:brightness-75 self-center
                font-semibold w-auto rounded-lg text-sm md:p-1.5 
                md:px-3 md:py-1.5 px-20 py-1 md:w-32">
                Send Message
            </button>
        </div>
    </div>

</template>

<script setup lang="ts">
import {
    SVGLoader
} from '@/components'
defineEmits(['onSendMessageModal'])
</script>