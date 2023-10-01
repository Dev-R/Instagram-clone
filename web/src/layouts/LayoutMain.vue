<template>
    <div class="sm:min-h-screen h-screen min-w-screen bg-black">
        <TopNavBar 
            v-if="!topNavBarHiddenRoutes.includes(routeName)" />

        <RouterView  />

        <!-- Mobile Navbar -->
        <BottomNavBar 
            v-if="!bottomNavBarHiddenRoutes.includes(routeName)" />

        <CommentModal
            v-if="isCommentModalOpen"
            :post-comment="{
                isToggled: true,
                post: post,
            }" />

        <!-- TODO: Figure this piece of shit    
             Should open comment modal when clicking comment icon in mobile screen
             should open postCard only when clicking post cover in mobile screen && expolore
        -->
        <!-- <div 
            v-if="isProfileModalOpen"
			class="md:max-w-md] justify-self-end p-2">
			<PostCard
				:post-item="post" />
		</div> -->
    </div>
</template>

<script setup lang="ts">
import {
    computed,
} from 'vue'

import {
    useRoute
} from 'vue-router'

import {
    TopNavBar,
    BottomNavBar,
    CommentModal,
    PostCard,
} from '@/components'

import {
    ModalName,
    type PostMedia
} from '@/common'

import { 
    useModalManagerStore
} from '@/stores'

const mediasArraySampleB: PostMedia[] = [{
        index: 0,
        type: 'video',
        mediaUrl: "https://into-the-program.com/uploads/sample_video02.mp4",
        title: "Legendary A"
    },
    {
        index: 1,
        type: 'image',
        mediaUrl: "https://loremflickr.com/1024/1280/love",
        title: "Legendary A"
    }
]
const post = {
    id: '1',
    userName: 'Sara',
    createdAt: 'February 24',
    likeCount: 10,
    hasLiked: false,
    caption: 'Be like a tree. Stay grounded. Connect with your roots. Turn over a new leaf. Bend before you break. Enjoy your unique natural beauty. Keep growing.',
    carouselMedia: mediasArraySampleB,
    commentCount: 5,
    profilePictureUrl: 'https://loremflickr.com/1024/1280/girl',
    isFollowed: false
}

// Routes without no top/bottom navbars
const topNavBarHiddenRoutes = ['style', 'stories', 'direct', 'reels', 'explore']
const bottomNavBarHiddenRoutes = ['stories', 'style', 'direct']

// Services
const route = useRoute()
const modalStoreManager = useModalManagerStore()

// Computed
const routeName = computed(() => {
    return route.name ? route.name.toString() : ''
})

const isCommentModalOpen = computed(() => {
    return modalStoreManager.getOpenModal === ModalName.COMMENT
})

const isProfileModalOpen = computed(() => {
    console.log("isProfileModalOpen", modalStoreManager.getOpenModal)
    return modalStoreManager.getOpenModal === ModalName.PROFILE
})
</script>