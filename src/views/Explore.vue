<template>
	<div class="sm:flex justify-center relative">
		<MobileSearchBar />

		<ExplorePostRenderer 
            v-if="posts"
			:posts="posts" />
	</div>
</template>
 
<script setup lang="ts">
import {
    ref,
    onMounted
} from 'vue'

import {
    MobileSearchBar,
    ExplorePostRenderer
} from '@/components'

import {
    SampleGenerator
} from '@/data'

import type {
	PostCard as PostCardType,
} from '@/common'

const posts = ref<PostCardType[] | undefined>(undefined)

onMounted(() => {
    posts.value = SampleGenerator.generateRandomPosts()
})
</script>