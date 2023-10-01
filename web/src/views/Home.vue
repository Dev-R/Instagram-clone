<template>
	<div class="bg-black">
		<section 
			class="container md:max-w-full mx-auto sm:h-screen scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none overflow-y-hidden h-screen': isModalToggled }">
			<div class="flex">
				<div 
					class="basis-1/6 md:block hidden space-y-12
                    sticky top-0 border-r border-gray-900">
					<NavBarMain
						@on-create="triggerPhotoModal" />
				</div>

				<div class="flex justify-center mx-auto sm:mt-10 space-x-12 w-full sm:w-auto">
					<!-- Center: Posts -->
					<div 
						class="flex flex-col w-full md:w-[470px] sm:w-auto
                        space-y-4 flex-nowrap lg:max-w-lg
                        justify-self-end lg:mr-[64px]">
						<!-- Stories -->
						<div 
							class="mb-6 relative md:rounded-xl md:bg-current 
                            overflow-auto md:border-current border-gray-800 
                            bg-slate-1000 border-t border-b">
							<StoryCarousel 
                                v-if="stories"
								:reels="stories" />
						</div>

						<!-- Posters -->
						<div class="flex flex-col space-y-8 sm:p-0 p-2.5 max-w-md mx-auto">
							<PostCard 
								v-for="(item, index) of posts"
								:key="index"
								:post-item="item"
								@on-open-comment-modal="triggerCommentModal"
								@on-post-like="changeLikeState" />
						</div>
					</div>

					<!-- Right bar: Suggestions -->
					<div class="lg:block hidden max-w-xs pt-8">
						<SuggestionCard 
                            v-if="suggested"
							:card-item="suggested" />
					</div>
				</div>
			</div>
		</section>

        <!-- TODO: Remove -->
		<!-- <CommentModal
			:post-comment="{
				isToggled: commentModal.isToggled,
				post: posts[commentModal.postId],
			}" 
			@on-modal-closed="triggerCommentModal" /> -->
        
        <!-- TODO: Remove to layout -->
		<PhotoModal 
			:is-toggled="photoModal.isToggled"
			@on-modal-closed="triggerPhotoModal"  
			@on-file-upload="uploadedFileData" />
	</div>
</template>

<script setup lang="ts">
// Imports
import {
    ref,
    watch,
    computed,
    onMounted
} from 'vue'

import {
    useRouter
} from 'vue-router'

import {
    NavBarMain,
    SuggestionCard,
    PostCard,
    StoryCarousel,
    PhotoModal
} from '@/components'

import {
    SampleGenerator
} from '@/data'

import {
    usePhotoStore
} from '@/stores'

import type {
    PostCard as PostCardType,
    SuggestionCard as SuggestionCardType,
    StoryCarousel as StoryCarouselType
} from '@/common'

const posts = ref<PostCardType[] | undefined>(undefined)
const stories = ref<StoryCarouselType[] | undefined>(undefined)
const suggested = ref<SuggestionCardType | undefined>(undefined)

// Data
const commentModal = ref({
    isToggled: false,
    postId: 0
})
const photoModal = ref({
    isToggled: false,
    currentStep: '',
    isFileValid: false
})
let windowWidth = ref(window.innerWidth) // Current window width

// Services
const router = useRouter()
const photoStore = usePhotoStore()

// Methods
/**
 * Update like state of a post.
 * @param id Liked / Unliked post ID
 */
 const changeLikeState = (id: number) => {
    if (!posts.value) return
    const postItem = posts.value[id]
    postItem.hasLiked = !postItem.hasLiked
}

/**
 * Trigger comment modal and pass post ID
 * @param id Post ID
 */
const triggerCommentModal = (id: number | undefined) => {
    // console.log('triggerCommentModal:', id)
    commentModal.value = {
        isToggled: !commentModal.value.isToggled,
        postId: id ? id : 0
    }
}

/**
 * Trigger photo modal
 */
const triggerPhotoModal = () => {
    photoModal.value.isToggled = !photoModal.value.isToggled
}

/**
 * Get uploaded file data and redirect to image view
 */
const uploadedFileData = () => {
    // Go to image view only when screen size is extra small (i.e: Phone screen)
    if (windowType.value === 'xs')
        router.push({
            name: 'style'
        })
    photoStore.isToggled = true // Trigger photoModal in mobile view 
}

/**
 * Get current screen width
 */
const windowType = computed(() => {
    if (windowWidth.value < 550) return 'xs'
    return null
})

/**
 * Check if a modal is toggled or not
 */
const isModalToggled = computed(() => {
    return commentModal.value.isToggled || photoModal.value.isToggled
})

// Disable scrolling when a modal is open
// TODO: Check why watcher not detecting changes on Comment Modal
watch([photoModal.value, commentModal.value], () => {
    console.log('Watching')
    if (photoModal.value.isToggled || commentModal.value.isToggled) {
        console.log('Watching')
        document.documentElement.style.overflow = 'hidden'
        return
    }
    document.documentElement.style.overflow = 'auto'
})

onMounted(() => {
    posts.value = SampleGenerator.generateRandomPosts(5, 15)
    stories.value = SampleGenerator.generateRandomStories(2, 5)
    suggested.value = SampleGenerator.generateRandomSuggestions(1, 1) as SuggestionCardType
})
</script>