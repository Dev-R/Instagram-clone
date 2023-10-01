<template>
	<div class="bg-black h-screen">
		<section
			class="container md:max-w-full md:mx-auto h-screen scrollbar scrollbar-thumb-gray-900">
			<div class="sm:flex justify-center">
				<div 
					class="basis-1/6 md:block hidden md:space-y-12
                    sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>
                    
				<MobileSearchBar />

				<ExplorePostRenderer 
					:posts="posts" />
			</div>
		</section>
	</div>
</template>
 
<script setup lang="ts">
import {
    ref,
    onMounted
} from 'vue'

import {
    NavBarMain,
    MobileSearchBar,
    ExplorePostRenderer
} from '@/components'

import {
    randomIntFromInterval,
    type PostCard as PostCardType,
} from '@/common'

import { 
    SocialPostSample
 } from '@/data'


const posts = ref <PostCardType[] | undefined>(undefined)

/**
 * Generates a random number of posts between MIN and MAX
 * and assigns them to the posts ref variable
 */
const generateRandomPosts = () => {
    const MIN_POSTS = 5 // minimum number of posts
    const MAX_POSTS = 20 // maximum number of posts
    const numberOfPosts = randomIntFromInterval(MIN_POSTS, MAX_POSTS) 
    posts.value =  Array.from({ length: numberOfPosts }, () => new SocialPostSample());
}

onMounted(() => {
    generateRandomPosts()
})
</script>