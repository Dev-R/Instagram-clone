<template>
    <div class="bg-black">
        <section class="container max-w-full mx-auto text-center">
            <div class="pt-5 grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div 
                    class="xl:col-span-2 col-span-1 bg-black 
                    md:block hidden space-y-12 relative h-screen 
                    sticky top-0 border-r border-gray-900">
                    <!-- A -->
                    <NavBarMain/>
                    
                </div>

                <!-- Center: Posts -->
                <div 
                    class="lg:col-span-6 lg:grid md:col-span-6 
                    md:col-start-4 md:mt-3 md:p-0 
                    col-span-12 bg-black p-2">
 
                    <div 
                        class="md:w-[470px] flex flex-col 
                        space-y-4 flex-nowrap lg:w-[470px] 
                        justify-self-end lg:mr-[64px]">

                        <!-- Stories -->
                        <div class="mb-6 flex snap-x space-x-2 justify-evenly">
                            <StoryCarousel :reels="reels"/>
                        </div>

                        <!-- Posters -->

                        <div class="flex flex-col space-y-8">
                            <PostCard 
                                v-for="(item, index) of postItems"
                                :post-item="item"
                                :key="index"/>
                        </div>
                         
                    </div>
                    
                </div>

                <!-- Right bar: Suggestions -->
                <div 
                    class="col-span-4 bg-black md:mt-5
                    lg:block hidden w-80">
                
                    <SuggestionCard 
                        :card-item="suggested"/>
                    
                </div>

            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

import PostMediaCarousel from '@/components/basics/PostMediaCarousel.vue'
import PostCard from '@/components/basics/PostCard.vue'
import type { PostMedia } from '@/common/models/post.model'
import SVGLoader from "@/components/basics/SVGLoader.vue"
import NavBarMain from '@/components/NavBarMain.vue'
import SuggestionCard from '@/components/basics/SuggestionCard.vue'
import StoryCarousel from '@/components/basics/StoryCarousel.vue'

export default defineComponent({
    name: 'Home',
    setup() {
        onMounted(() => {
            // console.log('Mounted Home')
        })

        const mediasArray: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/car",
                title: "Legendary A"
            },
            {
                index: 1,
                type: 'video',
                mediaUrl:
                    "https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Metal_Wind_Chimes_at_Sunset_preview.mp4",
                title: "Legendary B"
            },
            {
                index: 2,
                type: 'video',
                mediaUrl:
                    "https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Metal_Wind_Chimes_at_Sunset_preview.mp4",
                title: "Legendary C"
            },
            {
                index: 3,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/bird",
                title: "Legendary D"
            },
            {
                index: 4,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/family",
                title: "Legendary E"
            }
        ]


        const postItems= [{
            userName: 'Rabee',
            createdAt: '2 days',
            likeCount: 2793,
            hasLiked: true,
            caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
            carouselMedia: mediasArray,
            commentCount: 0,
            profilePictureUrl: 'http://via.placeholder.com/32x32'
        }]
        
        
        const suggested = {
            userName: 'Rabee',
            profilePictureUrl: 'http://via.placeholder.com/32x32',
            suggested: [{
                userName: 'Rabee',
                profilePictureUrl: 'http://via.placeholder.com/32x32',
                followedBy: 'imamomarsuleiman + 1 more'
            }]
        }


        const reels = [{
            userName: 'Rabee',
            profilePictureUrl: 'http://via.placeholder.com/32x32',
            expiringAt: '',
            seen: false,
            items: mediasArray,
            mediaCount: mediasArray.length
        }]

        return {
            mediasArray,
            postItems,
            suggested,
            reels
        }
    },
    components: {
    PostMediaCarousel,
    PostCard,
    SVGLoader,
    NavBarMain,
    SuggestionCard,
    StoryCarousel
}
})
</script>



<style>

</style>