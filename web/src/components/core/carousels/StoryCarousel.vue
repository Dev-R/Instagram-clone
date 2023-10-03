<template>
    <div class="max-w-md mx-auto bg-transparent shadow-xl min-w-0 p-1.5 sm:p-0">
        <div 
            class="overflow-x-auto flex space-x-6 
            scrollbar-thin scrollbar-thumb-gray-900 
            scrollbar-track-gray-100">
            <li 
                class="flex flex-none flex-col items-center space-y-1 active:scale-95 cursor-pointer pb-2"
                v-for="(reel, index) of reels" 
                @click="loadStory(reel.id)"
                :key="index">
                
                <div 
                    :class="{ 'animate-pulse': isRotating && index === activeIndex }"
                    @click="rotateAvatar(index)"
                    class="story-avatar">
                    <a href="#" class="block bg-white rounded-full relative">
                        <img 
                            class="md:w-16 md:h-16 h-14 w-14 rounded-full object-cover p-0.5 bg-black"
                            :src="reel.profilePictureUrl"/>
                    </a>

                </div>
                <a href="#" class="text-xs text-white font-semibold">{{ reel.userName }}</a>
            </li>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { StoryCarousel } from '@/common'

export default defineComponent({
    name: 'StoryCarousel',
    setup(reels) {

        const isRotating = ref(false)
        const activeIndex = ref<number>()

        // Services
        const router = useRouter()


        const rotateAvatar = (number: number) => {
            isRotating.value = !isRotating.value
            activeIndex.value = number
        }
        
        const loadStory = (id: string | number) => {
            router.push({ name: 'stories', params: { reels_id: id } })
        }
        onMounted(() => {
        })

        return { 
            loadStory, 
            rotateAvatar, 
            isRotating, 
            activeIndex 
        }
    },
    props: {
        reels: {
            type: Object as () => StoryCarousel[],
            required: true
        }
    }
})
</script>

<style scoped>
.story-avatar {
    position: relative;
    border-radius: 50%;
    padding: 2.5px;
    background-image: linear-gradient(to right top,#ffc600 20%,#ff0040,#e600cc 80%);
}
</style>