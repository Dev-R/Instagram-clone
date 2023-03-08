<template>
    <div class="container max-w-full h-full bg-[#1a1a1a] space-y-5 p-5">
        <Carousel3d 
            :controls-visible="true"
            :height="870"
            :width="490"
            :space="650"
            :perspective="0"
            :display="'5'">
            <Slide
                v-for="(media, i) in mediasArraySampleB" 
                :index="i">
                <img :src="media.mediaUrl">
                <!-- <video
                    class="min-h-[870px]" 
                    :autoplay="true"
                    :muted="true"> 
                    <source :src="media.mediaUrl" type="video/mp4">
                </video> -->
            </Slide>
        </Carousel3d>
    </div>
</template>

<script lang="ts">
import MediaCarousel from '@/components/basics/MediaCarousel.vue'

import { onMounted, defineComponent, ref } from 'vue'
import type { PostMedia } from '@/common/models/post.model'
import SVGLoader from "@/components/basics/SVGLoader.vue"
import CommentModal from '@/components/basics/CommentModal.vue'

// @ts-ignore
import { Carousel3d, Slide } from 'vue3-carousel-3d'

export default defineComponent({
    name: "Explore",
    setup() {

        // Checkers

        const screenSize = window
        
        const isToggled = ref<boolean>(true)

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
            userName: 'Rabee',
            profilePictureUrl: 'http://via.placeholder.com/32x32',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleA,
            mediaCount: mediasArraySampleA.length
        }]

        onMounted(() => {
            // console.log('Mounted Explore')
        })
        return { postItems, isToggled, toggleModel, mediasArraySampleB, screenSize }
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