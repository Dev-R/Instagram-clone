<template>
	<div class="bg-black h-screen">
		<section 
			class="container md:max-w-full mx-auto h-screen
			scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': false }">
			<div class="flex">
				<!-- Left bar: Navigation -->
				<div 
            class="basis-1/6 bg-black md:block hidden space-y-12 h-screen
            sticky top-0 border-r border-gray-900">

					  <NavBarMain />

				</div>

				<div class="bg-black scrollbar scrollbar-thumb-gray-900 md:p-0 w-full max-w-4xl mx-auto">
          
					<!-- Search Section -->
					<div 
              class="flex flex-col sm:border-r-2 border-gray-900 rounded-xl
              flex-nowrap sm:space-y-4 sm:pt-2 md:pt-5 justify-self-end h-full
              md:ml-5 lg:ml-0">

                <!-- Title -->
              <div class="text-xl font-sans sm:text-2xl text-white font-semibold hidden sm:block">
                  Search
              </div>

              <!-- Search Bar -->                        
              <SearchBar 
                  :is-search-loading="isSearchLoading"
                  :search-form="searchForm"
                  @onSearchQuery="searchForUser"
                  @on-clear-search-query="clearSearchQuery" />

              <div class="flex pt-4 border-t-2 border-gray-900">
                  <div class="text-md font-sans sm:text-xl text-white font-semibold">
                      {{ searchTitle }}
                  </div>
              </div>

              <div class="flex flex-col space-y-8">
                <div 
                    v-show="isSearchResultsEmpty && !isSearchLoading"
                    class="text-md font-sans sm:text-xl text-gray-500 self-center">
                    No recent searches.
                </div>      

                  <UserProfileSkeleton 
                      :is-loading="isSearchLoading" />
                  
                  <SearchCard 
                      v-for="result in searchResults"
                      :key="result.userName"
                      :search-result="result" />
                  
                </div>  

					</div>

				</div>

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
    UserProfileSkeleton,
    SearchCard,
    SearchBar
} from '@/components'

import type {
    SearchCard as SearchResult
} from '@/common'

const searchForm = ref<string>('')
const searchResults = ref<SearchResult[]>([])
const isSearchLoading = ref<boolean>(false)
const searchInput = ref<HTMLInputElement | null>(null)

/**
 * Assigns demo search results.
 * For demo only.
 */
const assignDemoSearchResults = () => {
    searchResults.value = [{
            userName: 'John Doe',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi eget nunc aliquam aliquet. Sed vitae nisi eget nunc aliquam aliquet.',
            profilePictureUrl: 'https://loremflickr.com/1024/1280/cat'
        },
        {
            userName: 'Jane Doe',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi eget nunc aliquam aliquet. Sed vitae nisi eget nunc aliquam aliquet.',
            profilePictureUrl: 'https://loremflickr.com/1024/1280/dog'
        }
    ]
}

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
            assignDemoSearchResults()
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