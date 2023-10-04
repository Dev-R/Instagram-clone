<template>
    <SearchWrapper 
        :title="searchTitle"
        :results="searchResults"
        :is-result-empty="isSearchResultsEmpty"
        :is-search-loading="isSearchLoading"
        @onSearchQuery="searchForUser"
        @onClearSearchQuery="clearSearchQuery" />
</template>
 
<script setup lang="ts">
import {
    ref,
    computed,
} from 'vue'

import {
    SearchWrapper
} from '@/components'

import type {
    SearchCard as SearchResult
} from '@/common'

import {
    SampleGenerator
} from '@/data'


const searchForm = ref<string>('')
const searchResults = ref<SearchResult[]>([])
const isSearchLoading = ref<boolean>(false)
const searchInput = ref<HTMLInputElement | null>(null)

/**
 * Searches for a user based on the search query.
 * @param payload The event payload.
 */
const searchForUser = (payload: Event) => {
    const searchInput = payload?.target as HTMLInputElement
    searchForm.value = searchInput.value
    searchResults.value = []

    isSearchLoading.value = true
    if (searchInput.value.trim() != '') {
        // Search for user  
        // searchResults.value = await searchForUser(searchInput.value) // TODO: Implement searchForUser
        setTimeout(() => {
            searchResults.value = SampleGenerator.generateRandomSearchResults()
            isSearchLoading.value = false
        }, 1000)
    }
}

/**
 * Clears the search query.
 */
const clearSearchQuery = () => {
    // searchInput.value!.value = ''
    searchResults.value = []
}

// Computed
// const isSearchLoading = computed(() => searchForm.value.length > 0)
const isSearchResultsEmpty = computed(() => searchResults.value.length === 0)
const searchTitle = computed(() => searchResults.value.length > 0 ? `Search results for "${searchForm.value}"` : 'Recent')
</script>