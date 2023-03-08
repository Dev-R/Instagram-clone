<template>
    <div class="container max-w-full h-screen bg-[#1a1a1a] space-y-5 p-2">
        <Carousel3d 
            
            :controls-visible="true"
            :height="870"
            :width="490"
            :space="800"
            :inverse-scaling="1200" 
            :perspective="0"
            :display="'5'">
            <Slide
                v-for="(reel, i) in reels" 
                :index="i">
                <figure class="relative max-w transition-all duration-300">
                    <!-- Progress Bar -->
                    <figcaption class="absolute inset-x-3 top-2 w-11/12 bg-gray-400 rounded-full h-0.5">
                        <div class="bg-gray-200 h-0.5 rounded-full" style="width: 45%"></div>
                    </figcaption>

                    <!-- Info Bar -->
                    <figcaption class="absolute py-2 text-lg top-5 flex flex-nowrap w-auto">
                        <div class="p-1 rounded-full">
                            <span class="block bg-white rounded-full relative">
                                <img 
                                    class="w-8 h-8 rounded-full object-cover"
                                    :src="reel.profilePictureUrl"/>
                            </span>
                        </div>

                        <div class="text-sm text-white self-center space-x-1">
                            <span>
                                Rabee
                            </span>

                            <i class="fa-solid fa-circle-check">
                            </i>
                            
                            <span>
                                3h
                            </span>
                        </div>
                    </figcaption>
                    
                    <!-- TODO: Add Support For Media Options -->
                    <!-- <figcaption
                        v-if="reel.items[0]?.type === 'video'"  
                        class="absolute py-5 px-2 text-lg top-5 right-0 flex flex-nowrap w-auto space-x-4">
                        <i class="fa-solid fa-play text-md text-gray-300"></i>

                        <i 
                            class="fa-solid fa-play 
                            text-md text-gray-300"
                            :class="{
                                'fa-volume-high': !isVideoMuted,
                                'fa-volume-xmark': isVideoMuted,
                            }">
                        </i>
                        <SVGLoader :icon="'story-options'" />
                    </figcaption> -->

                    <!-- Image -->
                    <img
                        v-if="reel.items[0]?.type === 'image'" 
                        :src="reel.items[0]?.mediaUrl" 
                        class="rounded-lg" 
                        :alt="reel.items[0]?.title" />

                    <!-- TODO: Add Support For Video-->
                    <!-- <video
                        v-else @load="" 
                        @canplay="appendToVideoElements(reel.items[0].index, $event)" 
                        :muted="isVideoMuted" 
                        class="absolute block w-full" 
                        :alt="reel.items[0].title">
                        <source :src="reel.items[0].mediaUrl" type="video/mp4">
                        Your browser does not support the video tag.
                    </video> -->

                    <!-- Reel Form -->
                    <figcaption class="absolute inset-x-3 bottom-6 w-11/12 rounded-full h-11 flex space-x-3">
                        <input 
                            type="text" 
                            class="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-full
                            focus:border-blue-500 block w-full p-2.5" 
                            placeholder="John">
                        
                        <SVGLoader :icon="'like'" :class="'self-center'"/>
                        <SVGLoader :icon="'direct'" :class="'self-center'"/> 
                    </figcaption>

                </figure>
            </Slide>
        </Carousel3d>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue';

// @ts-ignore
import { Carousel3d, Slide } from 'vue3-carousel-3d';

import MediaCarousel from '@/components/basics/MediaCarousel.vue';
import SVGLoader from "@/components/basics/SVGLoader.vue";
import CommentModal from '@/components/basics/CommentModal.vue';
import type { PostMedia } from '@/common/models/post.model';

export default defineComponent({
    name: "Story",
    setup() {

        // Checkers
        const screenSize = window
        const isToggled = ref<boolean>(true)

        // Video handlers
        const isVideoMuted = ref<boolean>(true) // Check if video is currently muted or not
        const isVideoPlaying = ref<boolean>(false) // Check if video is playing or not
        /**
         * An array of HTMLVideoElement instances.
         * Each element in the array corresponds to a video element on the page.
         */
         const videoElements = ref<HTMLVideoElement[]>([])


        /**
         * Mutes or unmutes the video with the specified index.
         * @param index The index of the video element to mute or unmute.
         */
         const toggleVideoMute = (index: number) => {
            const video = videoElements.value[index]
            isVideoMuted.value = !video.muted
        }

        
        /**
         * Append an HTMLVideoElement instance to the videoElements array
         * called only once on each video element.
         * 
         * @param index The index of the HTMLVideoElement instance in the videoElements array.
         * @param event The HTMLVideoElement to be saved.
         */
         const appendToVideoElements = (index: number, event: Event) => {
            videoElements.value[index] = event.target as HTMLVideoElement
        }


        const toggleModel = () => isToggled.value = !isToggled.value

        const mediasArraySampleB: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/490/870/sky",
                title: "Legendary A"
            },
            {
                index: 1,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/490/870/love",
                title: "Legendary A"
            },
            {
                index: 2,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/490/870/cat",
                title: "Legendary A"
            },
            {
                index: 3,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/490/870/dog",
                title: "Legendary A"
            },
        ]

        const mediasArraySampleA: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/490/870/car",
                title: "Legendary A"
            },
            {
                index: 1,
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
                    "https://loremflickr.com/490/870/bird",
                title: "Legendary D"
            },
        ]

        const mediasArraySampleD: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/490/870/life",
                title: "Legendary D"
            },
        ]

        const postItems = [
            {
                id: '0',
                userName: 'Rabee',
                createdAt: '2 days',
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
                createdAt: '1 day',
                likeCount: 1500,
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
                likeCount: 630,
                hasLiked: true,
                caption: 'Stay positive, work hard, and make it happen.',
                carouselMedia: mediasArraySampleC,
                commentCount: 3,
                profilePictureUrl: 'https://loremflickr.com/32/32/boy'
            },
            // Adding a new post with random data
            {
                id: '3',
                userName: 'Mona',
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
            id: 1 ,
            userName: 'Noura',
            profilePictureUrl: 'https://loremflickr.com/32/32/woman',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleA,
            mediaCount: mediasArraySampleA.length
        },
        {
            id: 2 ,
            userName: 'Rabee',
            profilePictureUrl: 'https://loremflickr.com/32/32/man',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleB,
            mediaCount: mediasArraySampleA.length
        },
        {
            id: 3 ,
            userName: 'Sloom',
            profilePictureUrl: 'https://loremflickr.com/32/32/boy',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleC,
            mediaCount: mediasArraySampleA.length
        },
        {
            id: 4 ,
            userName: 'Mohammed',
            profilePictureUrl: 'https://loremflickr.com/32/32/sky',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleA,
            mediaCount: mediasArraySampleA.length
        },
        {
            id: 5 ,
            userName: 'Rabee',
            profilePictureUrl: 'https://loremflickr.com/32/32/man',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleB,
            mediaCount: mediasArraySampleA.length
        },
        {
            id: 6 ,
            userName: 'Sloom',
            profilePictureUrl: 'https://loremflickr.com/32/32/boy',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleC,
            mediaCount: mediasArraySampleA.length
        },
        {
            id: 7 ,
            userName: 'Mohammed',
            profilePictureUrl: 'https://loremflickr.com/32/32/sky',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleB,
            mediaCount: mediasArraySampleA.length
        }
    ]

        onMounted(() => {
            // console.log('Mounted Explore')
        })
        return { postItems, isToggled, toggleModel, reels, screenSize , isVideoMuted, isVideoPlaying, toggleVideoMute, appendToVideoElements}
    },
    components: {
        MediaCarousel,
        SVGLoader,
        CommentModal,
        Carousel3d,
        Slide
    }
})
</script>

<style>
</style>