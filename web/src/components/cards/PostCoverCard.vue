<template>
    <div 
        v-for="(post, index) of posts"
        :key="index"
        class="h-fit w-fit basis-1/3 p-0.5 
        relative hover:brightness-75 group 
        hover:cursor-pointer"
        @click="$emit('onPostCover', index)">

        <div 
            class="flex absolute space-x-4 top-1/2 
            left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            md:group-hover:visible invisible">
            <div 
                class="flex font-bold text-white text-md space-x-1">
                <i class="fa-solid fa-heart mt-1"></i>

                <span>
                    {{ post.likeCount }}
                </span>
            </div>

            <div class="flex font-bold text-white text-md space-x-1">
                <i class="fa-solid fa-comment mt-1"></i>

                <span>
                    {{ post.commentCount }}
                </span>
            </div>
        </div>

        <img 
            v-if="post.carouselMedia"
            :src="post.carouselMedia[0]?.mediaUrl" />

    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import type { PostCard } from '@/common'

export default defineComponent({
    name: 'PostCoverCard',
    setup(prop) {
        onMounted(() => {
        })

        return { }
    },
    props: {
        posts: {
            type: Object as () => PostCard[],
            required: true,
        },
    },
    emits: [
        'onPostCover'
    ]
})
</script>