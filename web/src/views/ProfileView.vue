<template>
    <div class="bg-black">
        <section 
            class="container max-w-full mx-auto text-center h-screen  scrollbar scrollbar-thumb-gray-900"
            :class="{ 'brightness-50': commentModalInfo.isToggled }">
            <div class=" grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div 
                    class="xl:col-span-2 col-span-1 bg-black pt-5
                    md:block hidden space-y-12 relative h-screen 
                    sticky top-0 border-r border-gray-900">
                    <NavBarMain/>
                    
                </div>
                <!-- Center -->
                <div 
                    class="lg:col-span-8 lg:grid md:col-span-6  scrollbar scrollbar-thumb-gray-900
                    md:ml-5 lg:ml-0 md:col-start-2 md:mt-8 md:p-0
                    col-span-12 p-2">
                    
                    <div 
                        class="md:w-[950px] flex flex-col
                        space-y-4 flex-nowrap md:pt-0 pt-2
                        justify-self-end lg:mr--[64px]">            
                        <!-- Profile Info -->
                        <div class="flex md:space-x-14 md:pl-14 md:pb-8">
                            <!-- User Profile image -->
                            <div>
                                <img 
                                    src="https://loremflickr.com/1024/1280/black" 
                                    class="md:w-36 md:h-36 h-20 w-20 rounded-full">
                            </div>

                            <!-- Profile data -->
                            <div class="md:pl-20 bg-black flex flex-col space-y-6">
                                <div class="md:flex md:flex-row flex-col md:space-x-4 space-y-3 items-center">
                                    <!-- User name -->
                                    <div class="md:pl-0 pl-6 font-sans text-xl font-normal text-white text-left">
                                        hot_souce_56
                                    </div>

                                    <!-- Options -->
                                    <div class="md:pl-0 pl-6">
                                        <button 
                                            type="button" 
                                            class="text-gray-900 bg-white hover:bg-gray-100 
                                            border border-gray-200 font-semibold w-auto
                                            rounded-lg text-sm md:p-1.5 md:px-5 md:py-1.5 px-20 py-1.5  md:w-auto  ">

                                            Edit Profile
                                        </button>
                                    </div>
                                    <!-- Logged-in user Options -->
                                    <div>
                                        <SVGLoader :icon="'profile-options'" :class="'md:block hidden'"/>
                                    </div>
                                </div>
                                <!-- Profile Info -->
                                <div class="md:block hidden">
                                    <div class="flex space-x-10">
                                        <!-- Number of posts -->
                                        <div class="font-sans text-md font-normal text-white">
                                            <span class="font-sans text-md font-bold text-white">
                                                2
                                            </span>
                                            posts
                                        </div>
                                        <!-- Number of followers -->
                                    <div class="font-sans text-md font-normal text-white">
                                            <span class="font-sans text-md font-bold text-white">
                                                8
                                            </span>
                                            followers
                                        </div>
                                        <!-- Number of following -->
                                        <div class="font-sans text-md font-normal text-white">
                                            <span class="font-sans text-md font-bold text-white">47</span>
                                            following
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div 
                            class="text-center border-t md:hidden block
                            border-slate-1100 mt-2">
                            <ul class="flex space-x-14 flex-wrap justify-around pt-3 pl-4 pr-4">
                                <!-- Posts Tab -->

                                <div class="flex flex-col">
                                    <span class="text-sm subpixel-antialiase text-white">
                                            85
                                    </span>
                                    <span class="text-sm subpixel-antialiase text-gray-400">
                                            post
                                    </span>
                                </div>

                                <div class="flex flex-col">
                                    <span class="text-sm subpixel-antialiase text-white">
                                            84
                                    </span>
                                    <span class="text-sm subpixel-antialiase text-gray-400">
                                            followers
                                    </span>
                                </div>

                                <div class="flex flex-col">
                                    <span class="text-sm subpixel-antialiase text-white">
                                            545
                                    </span>
                                    <span class="text-sm subpixel-antialiase text-gray-400">
                                            following
                                    </span>
                                </div>

                            </ul>
                        </div>
                        <!-- Tab bar -->
                        <div 
                            class="text-center border-t
                            border-slate-1100">
                            <ul class="flex space-x-14 flex-wrap -mb-px md:justify-center justify-between px-6">

                                <!-- Posts Tab -->
                                <li 
                                    @click="navBarTabSwitcher('profile-posts')"
                                    class="hover:cursor-pointer">
                                    <div 
                                        class="flex items-center space-x-2
                                        inline-block py-4 p-1 border-t-2 border-gray-300 
                                        hover:border-gray-300"
                                        :class="{
                                            'border-transparent text-gray-200' : currentActiveTab != 'profile-posts',
                                            'text-white' : currentActiveTab === 'profile-posts'
                                        }">
                                        <SVGLoader :icon="'profile-posts-large'" :class="'md:block hidden'"/>
                                        <SVGLoader :icon="'profile-posts-small'" :class="'md:hidden block'"/>

                                        <span class="text-xs subpixel-antialiased hidden md:block">
                                            POSTS
                                        </span>

                                    </div>
                                </li>
                                <!-- Peeds Tab -->
                                <li 
                                    @click="navBarTabSwitcher('profile-peed')"
                                    class="hover:cursor-pointe md:hidden block">
                                    <div 
                                        class="flex items-center space-x-2
                                        inline-block py-4 p-1 border-t-2 border-gray-300 
                                        hover:border-gray-300"
                                        :class="{
                                            'border-transparent text-gray-200' : currentActiveTab != 'profile-peed',
                                            'text-white' : currentActiveTab === 'profile-peed'
                                        }">
                                        <SVGLoader :icon="'profile-peed-small'" :class="'md:hidden block'"/>

                                        <span class="text-xs subpixel-antialiased hidden md:block">
                                            Peeds
                                        </span>

                                    </div>
                                </li>

                                <!-- Profile Saved Tab -->
                                <li 
                                    @click="navBarTabSwitcher('profile-saved')"
                                    class="hover:cursor-pointer">
                                    <div 
                                        class="flex items-center space-x-2
                                        inline-block py-4 p-1 border-t-2 border-gray-300 
                                        hover:border-gray-300 hover:text-gray-300"
                                        :class="{
                                            'border-transparent text-gray-300' : currentActiveTab != 'profile-saved',
                                            'text-white font-bold' : currentActiveTab === 'profile-saved'
                                        }">

                                        <SVGLoader :icon="'profile-saved-large'" :class="'md:block hidden'"/>
                                        <SVGLoader :icon="'profile-saved-small'" :class="'md:hidden block'"/>

                                        <span class="text-xs subpixel-antialiased hidden md:block">
                                            SAVED
                                        </span>
                                    </div>
                                </li>
                                <!-- Profile Tagged -->
                                <li 
                                    @click="navBarTabSwitcher('profile-tagged')"
                                    class="hover:cursor-pointer">
                                    <div 
                                        class="flex items-center space-x-2
                                        inline-block py-4 p-1 border-t-2 border-gray-300 
                                        hover:border-gray-300 hover:text-gray-300"
                                        :class="{
                                            'border-transparent text-gray-300' : currentActiveTab != 'profile-tagged',
                                            'text-white' : currentActiveTab === 'profile-tagged'
                                        }">

                                        <SVGLoader :icon="'profile-tagged-large'" :class="'md:block hidden'"/>
                                        <SVGLoader :icon="'profile-tagged-small'" :class="'md:hidden block bg-greem-500'"/>

                                        <span class="text-xs subpixel-antialiased hidden md:block">
                                            TAGGED
                                        </span>
                    
                                    </div>
                                </li>

                            </ul>
                        </div>

                        <!-- Empty Section Messages -->
                        <!-- <div class="flex flex-col space-y-2 self-center pt-14 h-screen">
                            <i 
                                class="text-slate-1100 text-6xl pb-2"
                                :class="emptyTabBarBodyMessage.icon"></i>

                            <div class="flex flex-col space-y-4">
                                <span class="font-sans text-3xl text-white font-extrabold">
                                    {{ emptyTabBarBodyMessage.top }}
                                </span>

                                <span class="font-sans text-sm text-white font-normal">
                                    {{ emptyTabBarBodyMessage.body }}
                                </span>

                                <span class="font-sans text-sm text-sky-600 font-semibold">
                                    {{ emptyTabBarBodyMessage.footer }}
                                </span>
                            </div>
                            <i class="fa-regular fa-bookmark"></i>
                        </div> -->
                        
                        <!-- Image Rendering Sectio -->
                        <div 
                            v-if="currentActiveTab === 'profile-posts'"
                            class="flex flex-wrap">
                            

                            <div 
                                v-for="(post, index) of postItems"
                                @click="triggerCommentModal(index)"
                                class="h-fit w-fit basis-1/3 p-0.5 
                                relative hover:brightness-75 group 
                                hover:cursor-pointer">
                                <div 
                                    class="flex absolute space-x-4 top-1/2 
                                    left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                    md:group-hover:visible invisible">
                                    <div 
                                        class="flex font-bold text-white 
                                        text-md space-x-1">
                                        <i class="fa-solid fa-heart mt-1"></i>

                                        <span>
                                            {{ post.likeCount }}
                                        </span>
                                    </div>

                                    <div class="flex font-bold text-white text-md space-x-1">
                                        <i class="fa-solid fa-comment mt-1"></i>

                                        <span>
                                            {{ post.commentCount }}
                                        </span>
                                    </div>

                                </div>

                                <img :src="post.carouselMedia[0]?.mediaUrl">
                            </div>

                        </div>

                        <div class="p-5 text-sm subpixel-antialiase text-white md:block hidden">
                            © 2023 PhotoFlow
                        </div>

                    </div>
                    
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

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import SVGLoader from '@/components/basics/SVGLoader.vue'
import NavBarMain from '@/components/navbars/NavBarMain.vue'
import CommentModal from '@/components/basics/CommentModal.vue'

import type { PostMedia } from '@/common/models/post.model'

type navBarTabs = 'profile-posts' | 'profile-tagged' | 'profile-saved' | 'profile-peed'

export default defineComponent({
    name: 'ProfileView',
    setup() {

        // Selectors
        const currentActiveTab = ref<navBarTabs>('profile-posts') // Select profile-posts as default active tab
        const commentModalInfo = ref({
            isToggled: false,
            postId: 0
        })
        // Checkers
        const isCommentModalOpen = ref(false)

        // Computed
        // const findNumberOfLikes = computed(() => {
        //     return postItem.likeCount >= 1 ? `${postItem.likeCount} Likes` : 'Be the first to like this' 
        // })

        const triggerCommentModal = (id: number | undefined) => {
            console.log('triggerCommentModal:', id)
            commentModalInfo.value = { 'isToggled': !commentModalInfo.value.isToggled, postId: id ? id : 0 }
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
            }
        ]

        const mediasArraySampleB: PostMedia[] = [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/holiday",
                title: "Legendary B"
            },
            {
                index: 1,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/life",
                title: "Legendary B"
            }
        ]

        // Handlers
        const navBarTabSwitcher = (currentTab: navBarTabs) => {
            console.log("Current Tab:", currentTab, currentTab === 'profile-posts')
            currentActiveTab.value = currentTab
        }

        /**
         * Emit signal when comment modal button is clicked
         * @event comment-unliked
         * @param {string} postId - The ID of the post
         */
         const onOpenCommentModal = (postId: string) => {
            isCommentModalOpen.value = true;
            console.log("Emitting signal:", postId)
        };
        
        const emptyTabBarBodyMessage = computed(() => {
            switch (currentActiveTab.value) {
                case 'profile-posts':
                case 'profile-peed':
                    return {
                        icon: 'fa-solid fa-photo-film',
                        top: 'Share Photos',
                        body: 'When you share photos, they will appear on your profile.',
                        footer: 'Share your first photo'
                    }
                case 'profile-tagged':
                    return {
                        icon: 'fa-solid fa-users-viewfinder',
                        top: 'Start Saving',
                        body: 'Save photos and videos to your collection.',
                        footer: 'Add to collection'
                    }
                case 'profile-saved':
                    return {
                        icon: 'fa-regular fa-bookmark',
                        top: 'Photos of you',
                        body: "When people tag you in photos, they'll appear here.",
                        footer: ''
                    }
                default:
                    return {}
            }
        })

        const postItems = [
            {
                id: '0',
                userName: 'Rabee',
                createdAt: 'February 24',
                likeCount: 2456,
                hasLiked: true,
                caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
                carouselMedia: mediasArraySampleA,
                commentCount: 2456,
                profilePictureUrl: 'https://loremflickr.com/32/32/bird'
            },
            {
                id: '1',
                userName: 'Sara',
                createdAt: 'February 24',
                likeCount: 152,
                hasLiked: false,
                caption: 'Be like a tree. Stay grounded. Connect with your roots. Turn over a new leaf. Bend before you break. Enjoy your unique natural beauty. Keep growing.',
                carouselMedia: mediasArraySampleB,
                commentCount: 152,
                profilePictureUrl: 'https://loremflickr.com/32/32/girl'
            },
            {
                id: '3',
                userName: 'Sara',
                createdAt: 'February 24',
                likeCount: 152,
                hasLiked: false,
                caption: 'Be like a tree. Stay grounded. Connect with your roots. Turn over a new leaf. Bend before you break. Enjoy your unique natural beauty. Keep growing.',
                carouselMedia: mediasArraySampleA,
                commentCount: 152,
                profilePictureUrl: 'https://loremflickr.com/32/32/sky'
            }
            ,
            {
                id: '4',
                userName: 'Sara',
                createdAt: 'February 24',
                likeCount: 152,
                hasLiked: false,
                caption: 'Be like a tree. Stay grounded. Connect with your roots. Turn over a new leaf. Bend before you break. Enjoy your unique natural beauty. Keep growing.',
                carouselMedia: mediasArraySampleB,
                commentCount: 152,
                profilePictureUrl: 'https://loremflickr.com/32/32/drink'
            },
            {
                id: '5',
                userName: 'Sara',
                createdAt: 'February 24',
                likeCount: 152,
                hasLiked: false,
                caption: 'Be like a tree. Stay grounded. Connect with your roots. Turn over a new leaf. Bend before you break. Enjoy your unique natural beauty. Keep growing.',
                carouselMedia: mediasArraySampleA,
                commentCount: 152,
                profilePictureUrl: 'https://loremflickr.com/32/32/space'
            }
        ]


        return {
            postItems,
            commentModalInfo,
            currentActiveTab,
            triggerCommentModal,
            navBarTabSwitcher,
            emptyTabBarBodyMessage
        }
    },
    components: {
        SVGLoader,
        NavBarMain,
        CommentModal,
    }
})
</script>




<style>

</style>