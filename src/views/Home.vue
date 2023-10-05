<template>
    <div class="flex justify-center mx-auto sm:mt-10 space-x-12 w-full sm:w-auto">
        <!-- Center: Posts -->
        <div 
            class="flex flex-col w-full md:w-[470px] sm:w-auto
            space-y-4 flex-nowrap lg:max-w-lg
            justify-self-end lg:mr-[64px]">
            <!-- Stories -->
            <div 
                class="sm:mb-6 relative md:rounded-xl md:bg-current 
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
                    :post="item"
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
</template>

<script setup lang="ts">
// Imports
import {
    ref,
    computed,
    onMounted
} from 'vue'

import {
    SuggestionCard,
    PostCard,
    StoryCarousel
} from '@/components'

import {
    SampleGenerator
} from '@/data'

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
    commentModal.value = {
        isToggled: !commentModal.value.isToggled,
        postId: id ? id : 0
    }
}

onMounted(() => {
    posts.value = SampleGenerator.generateRandomPosts()
    stories.value = SampleGenerator.generateRandomStories(10, 25)
    suggested.value = SampleGenerator.generateRandomSuggestions() as SuggestionCardType
})
</script>