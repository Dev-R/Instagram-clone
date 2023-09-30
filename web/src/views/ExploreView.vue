<template>
	<div class="bg-black h-screen">
		<section
			class="container md:max-w-full mx-auto h-screen
			scrollbar scrollbar-thumb-gray-900">
			<div class="md:grid grid-cols-12 flex justify-center">
				<!-- Left bar: Navigation -->
				<div 
					class="xl:col-span-2 col-span-1 bg-black 
					md:block hidden space-y-12 h-screen 
					sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>

				<div 
					class="xl:col-span-8 lg:grid md:col-span-10 bg-black
					scrollbar scrollbar-thumb-gray-900
					md:col-start-2 md:p-0 col-span-12">
          
          <!-- Search Bar -->
          <MobileSearchBar 
            @on-search-query="navigateToSearch" />

					<!-- Profile Info -->
					<div 
						class="flex flex-col md:w-[935px] p-2
						flex-nowrap space-y-4 pt-2 md:pt-5 justify-self-end 
						md:ml-5 lg:ml-0 ">
						<!-- Image Rendering Section -->
						<div
							class="flex flex-wrap">
							<PostCoverCard 
								:posts="posts" />
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
 
<script setup lang="ts">
import {
    ref
} from 'vue'

import {
    useRouter
} from 'vue-router'

import {
    NavBarMain,
    PostCoverCard,
    MobileSearchBar
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

/**
 * Navigates to search page.
 */
const navigateToSearch = () => {
    useRouter().push('/search')
}
</script>