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

				<div class="bg-black scrollbar scrollbar-thumb-gray-900 md:p-0 p-2 w-full max-w-4xl mx-auto">
          
					<!-- Search Section -->
					<div 
              class="flex flex-col sm:border-r-2 border-gray-900 rounded-xl
              flex-nowrap space-y-4 pt-2 md:pt-5 justify-self-end h-full
              md:ml-5 lg:ml-0">

                <!-- Title -->
              <div class="text-xl font-sans sm:text-2xl text-white font-semibold hidden sm:block">
                  Search
              </div>

              <!-- Search Bar -->                        
              <SearchBar 
                  :is-search-loading="isSearchLoading"
                  :search-form="searchForm"
                  @onSearchQuery="searchForUser" />

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
 
<script lang="ts">

import {
	onMounted,
	defineComponent,
	ref,
	computed,
  onUnmounted
} from 'vue'


import {
	NavBarMain,
	CommentModal,
	SVGLoader,
	PostCard as PostCardModal,
  PostCoverCard,
  TheInput,
  UserProfileSkeleton,
  SearchCard,
  SearchBar
} from '@/components'

import type {
  SearchCard as SearchResult
} from '@/common'

export default defineComponent({
  name: 'Search',
  setup() {

    const searchForm = ref<string>('')
    const searchResults = ref<SearchResult[]>([])
    const isSearchLoading = ref<boolean>(false)


    /**
     * Assigns demo search results.
     * For demo only.
     */
    const assignDemoSearchResults = () => {
      searchResults.value = [
        {
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
     * Searches for a user.
     * @param payload The event payload.
     */
    const searchForUser = (payload: Event) => {
      const searchQuery = payload?.target as HTMLInputElement
      searchForm.value = searchQuery.value
      searchResults.value = []
      console.log('search query', searchQuery.value)

      isSearchLoading.value = true
      if (searchQuery.value.trim() != '') {
        // Search for user  
        // searchResults.value = await searchForUser(searchQuery.value) // TODO: Implement searchForUser
        // console.log('search results', searchResults.value)
        // For demo only
        setTimeout(() => {
          assignDemoSearchResults()
          isSearchLoading.value = false
        }, 1000)
      }
    }

    /**
     * Adds the resize event listener.
     */
    const addResizeListener = () => {
      window.addEventListener('resize', onWidthChange)
    }

    /**
     * Removes the resize event listener.
     */
    const removeResizeListener = () => {
      window.removeEventListener('resize', onWidthChange)
    }

    /**
     * Updates the window width on resize.
     */
    const onWidthChange = () => {
      windowWidth.value = window.innerWidth
    }

    // Computed
    const windowWidth = ref(window.innerWidth) // Current window width
    const screenSizeType = computed(() => (windowWidth.value < 550 ? 'xs' : false))
    // const isSearchLoading = computed(() => searchForm.value.length > 0)
    const isSearchResultsEmpty = computed(() => searchResults.value.length === 0)
    const searchTitle = computed(() => searchResults.value.length > 0 ? `Search results for "${searchForm.value}"` : 'Recent')

    // Lifecycle Hooks
    onMounted(() => {
      addResizeListener()
    })

    onUnmounted(() => {
      removeResizeListener()
    })

    return {
      searchForm,
      searchResults,
      searchForUser,
      searchTitle,
      isSearchLoading,
      isSearchResultsEmpty
    }
  },
  components: {
    NavBarMain,
    SVGLoader,
    CommentModal,
    PostCardModal,
    PostCoverCard,
    TheInput,
    UserProfileSkeleton,
    SearchCard,
    SearchBar
},
})

</script>

<style scoped>
</style>