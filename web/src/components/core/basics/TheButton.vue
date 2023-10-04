<template>
    <button
        class="font-medium text-center text-white 
        focus:outline focus:outline-2 transition-all border
        ease-in duration-150 disabled:cursor-not-allowed
        disabled:border-0"
        :class="{
            'w-full relative': isFull,
            'py-2 px-3': size === 'sm' || size === 'md',
            'p-3': size === 'lg',
            'text-xs': size === 'sm',
            'text-sm': size === 'md' || size === 'lg',
            'rounded-lg': !pill,
            'rounded-full': pill,
            'bg-sky-500 border-sky-500 \
            hover:bg-sky-700 focus:outline-sky-300 \
            disabled:bg-[#b1defc]': color === BasicColor.DEFAULT,
            'bg-indigo-500 border-indigo-500 \
            hover:bg-indigo-700 focus:outline-indigo-300 \
            disabled:bg-indigo-300': color === BasicColor.INFO,
            'bg-green-500 border-green-500 \
            hover:bg-green-700 focus:outline-green-300 \
            disabled:bg-green-300': color === BasicColor.SUCCESS,
            'bg-yellow-500 border-yellow-500 \
            hover:bg-yellow-700 focus:outline-yellow-300 \
            disabled:bg-yellow-300': color === BasicColor.WARNING,
            'bg-red-500 border-red-500 \
            hover:bg-red-700 focus:outline-red-300 \
            disabled:bg-red-300': color === BasicColor.DANGER,
            'hover:bg-indigo-500 border-indigo-500 \
            hover:text-white text-indigo-700 \
            disabled:bg-indigo-300 disabled:text-white \
            focus:outline-1' :  color === BasicColor.OUTLINE,
            'bg-[#363636] text-white \
            hover:text-white hover:bg-gray-800 border-none \
            disabled:bg-gray-500 disabled:text-white \
            focus:outline-none' :  color === BasicColor.DARK
        }">
        <slot>Button</slot>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { BasicColor } from '@/common'

export default defineComponent({
    name: 'TheButton',
    setup() {
        return {
            BasicColor
        }
    },
    props: {
        isFull: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'md'
        },
        pill: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: BasicColor.DEFAULT
        }
    }
})
</script>