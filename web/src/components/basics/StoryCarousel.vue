<template>
    <div class="max-w-md mx-auto bg-transparent shadow-xl min-w-0 p-1.5">
        <div 
            class="overflow-x-auto flex space-x-6 
            scrollbar-thin scrollbar-thumb-gray-900 
            scrollbar-track-gray-100">
            <li 
                class="flex flex-none flex-col items-center space-y-1"
                v-for="(reel, index) of reels" 
                @click="loadStory(reel.id)"
                :key="index">
                
                <div 
                    class="bg-gradient-to-tr from-yellow-400 
                    to-fuchsia-600 p-1 rounded-full">
                    <a href="#" class="block bg-white rounded-full relative">
                        <img 
                            class="md:w-16 md:h-16 h-14 w-14 rounded-full object-cover"
                            :src="reel.profilePictureUrl"/>
                    </a>

                </div>
                <a href="#" class="text-xs text-white font-semibold">{{ reel.userName }}</a>
            </li>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import type { StoryCarousel } from '@/common/models/Post.model'

export default defineComponent({
    name: 'StoryCarousel',
    setup(reels) {

        // Services
        const router = useRouter()

        const loadStory = (id: string | number) => {
            console.log("ID:", id)
            router.push({ name: 'stories', params: { reels_id: id } })
        }
        onMounted(() => {
        })

        return { loadStory }
    },
    props: {
        reels: {
            type: Object as () => StoryCarousel[],
            required: true
        }
    }
})
</script>