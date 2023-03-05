<template>
    <div class="bg-black">
        <section 
            class="container max-w-full mx-auto text-center"
            :class="{ 'brightness-50': commentModalInfo.isToggled }">
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
                                @on-open-comment-modal="triggerCommentModal"
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
        <!-- Comment Modal -->
        <CommentModal
            @on-modal-closed="triggerCommentModal" 
            :post-comment="{
                isToggled: commentModalInfo.isToggled,
                post : postItems[commentModalInfo.postId],
            }"/>

        <!-- Mobile Navbar -->
        <NavBarMobile />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import MediaCarousel from '@/components/basics/MediaCarousel.vue'
import PostCard from '@/components/basics/PostCard.vue'
import type { PostMedia } from '@/common/models/post.model'
import SVGLoader from "@/components/basics/SVGLoader.vue"
import NavBarMain from '@/components/navbars/NavBarMain.vue'
import NavBarMobile from '@/components/navbars/NavBarMobile.vue'
import SuggestionCard from '@/components/basics/SuggestionCard.vue'
import StoryCarousel from '@/components/basics/StoryCarousel.vue'
import CommentModal from '@/components/basics/CommentModal.vue'

export default defineComponent({
    name: 'Home',
    setup() {
        

        const commentModalInfo = ref({
            isToggled: false,
            postId: 0
        })

        const triggerCommentModal = (id: number | undefined) => {
            console.log('triggerCommentModal:', id)
            commentModalInfo.value = {'isToggled': !commentModalInfo.value.isToggled , postId: id ? id : 0}
        }
        const mediasArraySampleA: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/cat",
                title: "Legendary A"
            },
            {
                index: 1,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/nature",
                title: "Legendary A"
            },
            {
                index: 2,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/bird",
                title: "Legendary A"
            },
            {
                index: 3,
                type: 'video',
                mediaUrl:
                    "https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Metal_Wind_Chimes_at_Sunset_preview.mp4",
                title: "Legendary B"
            },
        ]


        const mediasArraySampleB: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/sky",
                title: "Legendary A"
            },
            {
                index: 1,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/love",
                title: "Legendary A"
            },
            {
                index: 2,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/happy",
                title: "Legendary A"
            },
            {
                index: 3,
                type: 'video',
                mediaUrl:
                    "https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Metal_Wind_Chimes_at_Sunset_preview.mp4",
                title: "Legendary B"
            },
        ]

        const mediasArraySampleC: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/bird",
                title: "Legendary D"
            },
        ]

        const mediasArraySampleD: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/life",
                title: "Legendary D"
            },
        ]

        const postItems = [
            {
                id: '0',
                userName: 'Rabee',
                createdAt: 'February 24',
                likeCount: 0,
                hasLiked: true,
                caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
                carouselMedia: mediasArraySampleA,
                commentCount: 0,
                profilePictureUrl: 'https://loremflickr.com/32/32/bird'
            },
            {
                id: '1',
                userName: 'Sara',
                createdAt: 'February 24',
                likeCount: 10,
                hasLiked: false,
                caption: 'Be like a tree. Stay grounded. Connect with your roots. Turn over a new leaf. Bend before you break. Enjoy your unique natural beauty. Keep growing.',
                carouselMedia: mediasArraySampleB,
                commentCount: 5,
                profilePictureUrl: 'https://loremflickr.com/32/32/girl'
            },
            {
                id: '2',
                userName: 'Ali',
                createdAt: '5 hours',
                likeCount: 10,
                hasLiked: true,
                caption: 'Stay positive, work hard, and make it happen.',
                carouselMedia: mediasArraySampleC,
                commentCount: 3,
                profilePictureUrl: 'https://loremflickr.com/32/32/boy'
            },
            // Adding a new post with random data
            {
                id: '3',
                userName: 'Rick',
                createdAt: '10 hours',
                likeCount: 210,
                hasLiked: false,
                caption: 'Chase your dreams, but always know the road that will lead you home again.',
                carouselMedia: mediasArraySampleD,
                commentCount: 2,
                profilePictureUrl: 'https://loremflickr.com/32/32/woman'
            }
        ]
        
        
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
            items: mediasArraySampleA,
            mediaCount: mediasArraySampleA.length
        }]

        return {
            postItems,
            suggested,
            reels,
            commentModalInfo,
            triggerCommentModal
        }
    },
    components: {
        MediaCarousel,
        PostCard,
        SVGLoader,
        NavBarMain,
        SuggestionCard,
        StoryCarousel,
        CommentModal,
        NavBarMobile
}
})
</script>



<style>

</style>