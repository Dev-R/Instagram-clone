<template>
    <div 
        v-show="isLoading"
        v-for="index in numberOfSkeletons"
        :key="index"
        class="rounded-lg flex items-center space-x-2 w-full p-2 h-12 animate-pulse">

        <div class="flex-inital">
            <div class="w-8 h-8 lg:w-14 lg:h-14 rounded-full bg-gray-800">
            </div>
        </div>

        <div class="flex space-y-3 flex-inital flex-col">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 self-start">
            </div>

            <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 self-start">
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
defineProps({
    isLoading: Boolean,
    numberOfSkeletons: {
        type: Number,
        default: 5
    }
})
</script>