<template>
    <div class="bg-black">
        <section 
            class="container max-w-full mx-auto text-center"
            :class="{ 'brightness-50 pointer-events-none': commentModal.isToggled || photoModal.isToggled }">
            <div class="grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div 
					class="xl:col-span-2 col-span-1 bg-black
					md:block hidden space-y-12 h-screen 
					sticky top-0 border-r border-gray-900">
                    
                    <!-- A -->
                    <NavBarMain
                        @on-create="triggerPhotoModal"/>
                    
                </div>

                <!-- Center: Posts -->
                <div 
                    class="lg:col-span-6 lg:grid md:col-span-6 
                    md:col-start-4 md:mt-8
                    col-span-12 bg-black">
 
                    <div 
                        class="md:w-[470px] flex flex-col 
                        space-y-4 flex-nowrap lg:w-[470px] 
                        justify-self-end lg:mr-[64px]">

                        <!-- Stories -->
                        <div 
                            class="mb-6 relative md:rounded-xl md:bg-current 
                            overflow-auto md:border-current border-gray-800 
                            bg-slate-1000 border-t border-b">
                            <StoryCarousel :reels="reels"/>
                        </div>

                        <!-- Posters -->
                        <div class="flex flex-col space-y-8 sm:p-0 p-2.5">
                            <PostCard 
                                v-for="(item, index) of postItems"
                                @on-open-comment-modal="triggerCommentModal"
                                @on-post-like="changeLikeState"
                                :post-item="item"
                                :key="index"/>
                        </div>

                    </div>
                    
                </div>

                <!-- Right bar: Suggestions -->
                <div 
                    class="col-span-4 bg-black md:mt-8
                    lg:block hidden w-80">
                
                    <SuggestionCard 
                        :card-item="suggested"/>
                    
                </div>
            </div>
        </section>
        <!-- Modals -->

        <!-- Comment Modal -->
        <CommentModal
            @on-modal-closed="triggerCommentModal" 
            :post-comment="{
                isToggled: commentModal.isToggled,
                post: postItems[commentModal.postId],
            }"/>
        
        <!-- Photo Modal -->
        <PhotoModal 
            @on-modal-closed="triggerPhotoModal"
            @on-file-upload="uploadedFileData"  
            :is-toggled="photoModal.isToggled" />  

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

import {
    SVGLoader,
    NavBarMain,
    SuggestionCard,
    PostCard,
    StoryCarousel,
    MediaCarousel,
    CommentModal,
    PhotoModal
} from '@/components'

import type { PostCard as PostCardType, PostMedia } from '@/common'
import { usePhotoStore } from '@/stores'

export default defineComponent({
    name: 'HomeView',
    setup(props, context) {


        const commentModal = ref({
            isToggled: false,
            postId: 0
        })

        const photoModal = ref({
            isToggled: false,
            currentStep: '',
            isFileValid: false
        })

        let windowWidth = ref(window.innerWidth) // Current window width

        // Services
        const router = useRouter()
        const photoStore = usePhotoStore()

        const triggerCommentModal = (id: number | undefined) => {
            // console.log('triggerCommentModal:', id)
            commentModal.value = { isToggled: !commentModal.value.isToggled, postId: id ? id : 0 }
        }

        const triggerPhotoModal = () => {
            photoModal.value.isToggled = !photoModal.value.isToggled
        }


        const uploadedFileData = () => {
            // Go to image view only when screen size is extra small (i.e: Phone screen)
            if (windowType.value === 'xs')
                router.push({
                    name: 'style'
                })
            photoStore.isToggled = true // Trigger photoModal in mobile view 
        }

        // Computed
        /**
         * Get current screen width
         */
        const windowType = computed(() => {
            if (windowWidth.value < 550) return 'xs'
            return null
        })

        // Watchers
        // Disable scrolling when a modal is open
        // TODO: Check why watcher not detecting changes on Comment Modal
        watch([photoModal.value, commentModal.value], () => {
            console.log('Watching')
            if (photoModal.value.isToggled || commentModal.value.isToggled) {
                console.log('Watching')
                document.documentElement.style.overflow = 'hidden'
                return
            }
            document.documentElement.style.overflow = 'auto'
        })

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
                type: 'video',
                mediaUrl:
                    "https://into-the-program.com/uploads/sample_video02.mp4",
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

        const postItems = ref<PostCardType[]>([
            {
                id: '0',
                userName: 'Rabee',
                createdAt: 'February 24',
                likeCount: 0,
                hasLiked: true,
                caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
                carouselMedia: mediasArraySampleA,
                commentCount: 0,
                profilePictureUrl: 'https://loremflickr.com/32/32/bird',
                isFollowed: false,
                comments: [
                    {
                        id: 0,
                        userName: 'Sara',
                        profilePictureUrl: 'https://loremflickr.com/1024/1280/woman',
                        content: "\
                        Subhanallah x3 \
                        Alhamdulillah x3 \
                        La ilaha ilallah x3 \
                        Astagfirullah x3Astagfirullah x3 \
                        Allahu akbar x3",
                        createdAt: '2012-02-23'
                    }
                ]
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
                profilePictureUrl: 'https://loremflickr.com/32/32/girl',
                isFollowed: false
            }
        ])

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
            id: 1,
            userName: 'Noura',
            profilePictureUrl: 'https://loremflickr.com/1024/1280/woman',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleA,
            mediaCount: mediasArraySampleA.length
        },
        {
            id: 2,
            userName: 'Rabee',
            profilePictureUrl: 'https://loremflickr.com/1024/1280/man',
            expiringAt: '',
            seen: false,
            items: mediasArraySampleA,
            mediaCount: mediasArraySampleA.length
        }
        ]

        /**
         * Update like state of a post.
         * @param id Liked / Unliked post ID
         */
        const changeLikeState = (id: number) => {
            const postItem = postItems.value[id]
            postItem.hasLiked = !postItem.hasLiked
        }

        return {
            postItems,
            suggested,
            reels,
            commentModal,
            photoModal,
            triggerCommentModal,
            triggerPhotoModal,
            uploadedFileData,
            changeLikeState
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
        PhotoModal
    },
    props: {}
})
</script>



<style>

</style>