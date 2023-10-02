<template>
	<div class="bg-black h-screen">
		<section 
			class="container md:max-w-full mx-auto h-screen
			scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': false }">
			<div class="flex">
				<div 
					class="basis-1/6 bg-black md:block hidden space-y-12 h-screen
                    sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>
				<SearchWrapper 
					:title="searchTitle"
					:results="searchResults"
					:is-result-empty="isSearchResultsEmpty"
					:is-search-loading="isSearchLoading"
					@onSearchQuery="searchForUser"
					@onClearSearchQuery="clearSearchQuery" />
			</div>
		</section>
	</div>
</template>
 
<script setup lang="ts">
import {
    ref,
    computed,
} from 'vue'

import {
    NavBarMain,
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
        // console.log('search results', searchResults.value)
        setTimeout(() => {
            searchResults.value = SampleGenerator.generateRandomSearchResults(2, 5)
            isSearchLoading.value = false
        }, 1000)
    }
}

/**
 * Clears the search query.
 */
const clearSearchQuery = () => {
    console.log('clear search query', searchInput)
    // searchInput.value!.value = ''
    searchResults.value = []
}

// Computed
// const isSearchLoading = computed(() => searchForm.value.length > 0)
const isSearchResultsEmpty = computed(() => searchResults.value.length === 0)
const searchTitle = computed(() => searchResults.value.length > 0 ? `Search results for "${searchForm.value}"` : 'Recent')
</script>