<template>
  <div class="container max-w-full bg-red space-y-5">
<CommentModal :post-comment="{
                isToggled: false,
                post : postItems[0],
                }"/>
  </div>
</template>

<script lang="ts">
import MediaCarousel from '@/components/basics/MediaCarousel.vue'

import { onMounted, defineComponent, ref } from 'vue'
import type { PostMedia } from '@/common/models/post.model'
import SVGLoader from "@/components/basics/SVGLoader.vue"
import CommentModal from '@/components/basics/CommentModal.vue'


export default defineComponent({
  name: "Explore",
  setup() {

      // Checkers

      const isToggled = ref<boolean>(true) 

      const toggleModel = () => isToggled.value = !isToggled.value

      const mediasArraySampleA: PostMedia[] = [
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
        ]


        const mediasArraySampleB: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/bird",
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
      return { postItems, isToggled, toggleModel }
  },
  components: { MediaCarousel, SVGLoader, CommentModal }
})
</script>

<style>
.outter-scrolling::-webkit-scrollbar{
width: 0;
scrollbar-width: none;
}
</style>