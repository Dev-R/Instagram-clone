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
    SampleGenerator
} from '@/data'

import type {
	PostCard as PostCardType,
} from '@/common'

const posts = ref <PostCardType[] | undefined>(undefined)

onMounted(() => {
    posts.value = SampleGenerator.generateRandomPosts(5, 20)
})
</script>