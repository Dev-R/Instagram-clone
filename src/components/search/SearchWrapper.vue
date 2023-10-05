<template>
    <div class="bg-black scrollbar scrollbar-thumb-gray-900 md:p-0 w-full max-w-4xl mx-auto h-screen">
        <div 
            class="flex flex-col sm:border-r-2 border-gray-900 rounded-xl
            flex-nowrap sm:space-y-4 sm:pt-2 md:pt-5 justify-self-end h-full
            md:ml-5 lg:ml-0">

            <SearchTitle />
            
            <SearchBar 
                :is-loading="isSearchLoading"
                @onSearchQuery="$emit('onSearchQuery', $event)"
                @on-clear-search-query="$emit('onClearSearchQuery')" />

            <SearchFeed 
                :search-title="title"
                :is-empty="isResultEmpty"
                :is-loading="isSearchLoading"
                :results="results" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type {
    PropType
} from 'vue'

import {
    SearchBar,
    SearchFeed,
    SearchTitle
} from '@/components'

import type {
    SearchCard as SearchResult
} from '@/common'

defineProps({
    title: {
        type: String,
        required: true
    },
    results: {
        type: Array as PropType <SearchResult[]> ,
        required: true
    },
    isResultEmpty: {
        type: Boolean,
        required: true
    },
    isSearchLoading: {
        type: Boolean,
        required: true
    }
})

defineEmits([
    'onSearchQuery',
    'onClearSearchQuery'
])
</script>