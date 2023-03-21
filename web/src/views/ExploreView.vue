<template>
    <div class="container max-w-full h-full bg-[#1a1a1a] space-y-5 p-5">

<!-- Small Modal -->
        <smallModalVue title="Follow" :items="suggested"  />
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import PostCard from '@/components/basics/PostCard.vue';
import type { PostMedia } from '@/common/models/Post.model';
import SVGLoader from '@/components/basics/SVGLoader.vue'
import smallModalVue from '@/components/basics/smallModal.vue'


export default defineComponent({
    name: 'Explore',
    setup() {

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
            }
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
            }
        ]
        const suggested = [{
            userName: 'Rabee',
            profilePictureUrl: 'http://via.placeholder.com/32x32',
            suggested: [{
                userName: 'Rabee',
                profilePictureUrl: 'http://via.placeholder.com/32x32',
                followedBy: 'imamomarsuleiman + 1 more'
            }]
        }]

        const postItem = {
            id: '0',
            userName: 'Rabee',
            createdAt: '',
            likeCount: 0,
            hasLiked: true,
            caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
            carouselMedia: mediasArraySampleA,
            commentCount: 0,
            profilePictureUrl: 'https://loremflickr.com/32/32/bird'
        }

        onMounted(() => {
            // console.log('Mounted Explore')
        })

        return {
            postItem,
            suggested
        }
    },
    components: {
    PostCard,
    SVGLoader,
    smallModalVue
}
})
</script>