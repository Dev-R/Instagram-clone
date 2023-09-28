<template>
    <div class="flex justify-between items-center space-x-2 p-2.5 pb-2 border-b border-gray-600 sm:hidden">
        <input
        @focus="navigateToSearch"
        class="w-full bg-black text-white border-1 border-gray-400 rounded-lg h-8
        text-sm focus:outline-none placeholder-gray-400"
        placeholder="Search"/>

        <div class="text-sm text-white font-sans font-semibold">
            Cancel
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits([
    'on-search-query'
])

const navigateToSearch = () => {
    emit('on-search-query')
}
</script>