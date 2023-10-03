<template>
    <div class="flex flex-col space-y-8 max-w-md mx-auto p-2">
        <PostCard 
            v-if="post"
            :is-comment-area-visible="false"
            :post="post" />
    </div>
</template>

<script setup lang="ts">
import {
    onMounted,
    ref
} from 'vue'

import {
    useRouter
} from 'vue-router'

import {
    PostCard
} from '@/components'

import type {
    PostCard as PostCardType
} from '@/common'

import { useModalManagerStore } from '@/stores'

const modalStoreManager = useModalManagerStore()
const post = ref<PostCardType | undefined>(undefined)



onMounted(() => {
    // const postId = route.params.id // TODO: Remove this when the API is ready
    // const posts = SampleGenerator.generateRandomPosts()
    // post.value = posts[0]
    post.value = modalStoreManager.getActivePost
    if (!post.value) {
        // If post is undefined, redirect to home
        useRouter().push('/')
    }
})
</script>