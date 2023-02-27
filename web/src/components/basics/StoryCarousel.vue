<template>
    <div class="w-[66px] h-[66px] flex flex-col items-center">

        <div
            v-for="(reel, index) of reels"
            :key="index">

            <div
                class="bg-gradient-to-tr from-yellow-400 
                to-pink-500 p-[0.20rem] rounded-full">
                <span class="block rounded-full">
                    <img 
                        class="rounded-full" 
                        :src="reel.profilePictureUrl">
                </span>
            </div>

            <span class="text-white text-xs">
                {{ reel.userName }}
            </span>

        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import type { StoryCarousel } from '@/common/models/post.model'

export default defineComponent({
    name: 'StoryCarousel',
    setup(reels) {
        onMounted(() => {
        })

        return {}
    },
    props: {
        reels: {
            type: Object as () => StoryCarousel[],
            required: true
        }
    }
})
</script>