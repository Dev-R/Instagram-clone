<template>
	<div class="bg-black h-screen">
		<section
			class="container md:max-w-full md:mx-auto h-screen scrollbar scrollbar-thumb-gray-900">
			<div class="sm:flex justify-center">
				<div 
					class="basis-1/6 md:block hidden md:space-y-12
                    sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>
                    
				<MobileSearchBar />

				<ExplorePostRenderer 
					:posts="posts" />
			</div>
		</section>
	</div>
</template>
 
<script setup lang="ts">
import {
    ref
} from 'vue'

import {
    NavBarMain,
    MobileSearchBar,
    ExplorePostRenderer
} from '@/components'


import type {
    PostCard as PostCardType,
    PostMedia,
} from '@/common'

// Sample Data
const mediasArraySampleA: PostMedia[] = [{
        index: 0,
        type: 'image',
        mediaUrl: 'https://loremflickr.com/1024/1280/cat',
        title: 'Legendary A'
    },
    {
        index: 1,
        type: 'image',
        mediaUrl: 'https://loremflickr.com/1024/1280/nature',
        title: 'Legendary A'
    }
]

const mediasArraySampleB: PostMedia[] = [{
        index: 0,
        type: 'image',
        mediaUrl: 'https://loremflickr.com/1024/1280/life',
        title: 'Legendary A'
    },
    {
        index: 1,
        type: 'image',
        mediaUrl: 'https://loremflickr.com/1024/1280/car',
        title: 'Legendary A'
    }
]

// Sample Data
const posts = ref < PostCardType[] > ([{
        id: '0',
        userName: 'Rabee',
        createdAt: 'February 24',
        likeCount: 2456,
        hasLiked: true,
        caption: 'Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30',
        carouselMedia: mediasArraySampleA,
        commentCount: 2456,
        profilePictureUrl: 'https://loremflickr.com/32/32/life',
        isFollowed: false,
        comments: []
    },
    {
        id: '1',
        userName: 'Rabee',
        createdAt: 'February 24',
        likeCount: 2456,
        hasLiked: true,
        caption: 'Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30',
        carouselMedia: mediasArraySampleB,
        commentCount: 2456,
        profilePictureUrl: 'https://loremflickr.com/32/32/dog',
        isFollowed: false,
        comments: []
    }
])
</script>