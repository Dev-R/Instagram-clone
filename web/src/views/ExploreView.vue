<template>
    <div class="container w-[470px] p-2">
        <PostCard 
            :post-item="postItem"/>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import PostCard from '@/components/basics/PostCard.vue';
import type { PostMedia } from '@/common/models/Post.model';


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
            postItem
        }
    },
    components: {
        PostCard
    }
})
</script>