<template>
    <div class="flex justify-center mx-auto space-x-12 pt-10 sm:pt-0">
        <div 
            class="flex flex-col md:max-w-4xl p-2
            flex-nowrap space-y-4 pt-2 md:pt-5 justify-self-end 
            md:ml-5 lg:ml-0">
            <div
                class="flex flex-wrap">
                <PostCoverCard 
                    v-if="posts"
                    :posts="posts" />

                <LoadingSpinner 
                    :is-loading="!posts" 
                    :size="'md'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {
    PropType
} from 'vue'

import {
    PostCoverCard,
    LoadingSpinner
} from '@/components'

import type {
    PostCard as PostCardType,
} from '@/common'

defineProps({
    posts: {
        type: Object as PropType<PostCardType[]> ,
        required: true
    }
})
</script>