<template>
    <div class="flex pt-4 border-t-2 border-gray-900">
        <div class="text-md font-sans sm:text-xl text-white font-semibold">
            {{ searchTitle }}
        </div>
    </div> 
    <div class="flex flex-col space-y-8">
        <div 
            v-show="isEmpty && !isLoading"
            class="text-md font-sans sm:text-xl text-gray-500 self-center">
            No recent searches.
        </div>      

        <UserProfileSkeleton 
            :is-loading="isLoading" />
        
        <SearchCard 
            v-for="result in results"
            :key="result.userName"
            :search-result="result" />
    </div> 
</template>

<script setup lang="ts">
import type {
    PropType
} from 'vue'

import {
    UserProfileSkeleton,
    SearchCard
} from '@/components'

import type {
    SearchCard as SearchResult
} from '@/common'

defineProps({
    isEmpty: {
        type: Boolean,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    },
    results: {
        type: Array as PropType <SearchResult[]> ,
        required: true
    },
    searchTitle: {
        type: String,
        required: true
    }
})
</script>