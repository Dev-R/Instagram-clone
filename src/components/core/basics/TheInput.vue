<template>
    <input
        class="mt-1 block w-full rounded-sm bg-gray-50
        border border-gray-300 text-gray-900
        text-sm py-1.5 px-3 focus:outline-none focus:ring-0
        transition ease-out duration-300 disabled:text-gray-500
        disabled:bg-gray-100 disabled:cursor-not-allowed"
        :class="$attrs.class"
        type="{{ $attrs.type }}"
        :value="modelValue" 
        @blur="$emit('blur')"
        @input="$emit('update:modelValue',
                      ($event.target as HTMLInputElement).value)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TheInput',
    setup() {
        return { }
    },
    props: ['modelValue']
})
</script>