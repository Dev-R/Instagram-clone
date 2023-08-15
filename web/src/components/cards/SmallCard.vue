<template>
    <div 
        :class="class"
        class="flex flex-inital flex-row text-center space-x-1">
        <img 
            :src="profileImage" 
            class="w-10 h-10 rounded-full">
        
        <div class="flex pl-1.5 pt-2 space-x-2">
            <a 
                :href="profileLink"
                class="font-sans text-md text-white self-start">
                <slot name="user-name"></slot>
            </a>
            <span class="font-sans text-md text-white self-start">
                ·
            </span>
            <span
                @click="$emit('onActionClick')"
                class="font-sans font-semibold text-sm text-white pt-1 cursor-pointer">
                <slot name="action-name"></slot>
            </span>
        </div>

    </div>

    <button 
        v-if="showButton"
        type="button" 
        class="flex-inital self-end text-gray-900 
        border border-gray-200 font-semibold 
        bg-white sm:hover:bg-gray-100 rounded-lg 
        text-sm p-1.5 px-6 py-1.5">
            <slot name="button-name"></slot>
    </button>
    
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'


export default defineComponent({
    name: 'smallCard',
    setup(prop) {
        onMounted(() => {
        })

        return { }
    },
    props: {
        profileImage: { type: String },
        profileLink: { type: String },
        class: {
            type: String,
            required: false
        },
        showButton: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: [
        'onActionClick'
    ]
})
</script>