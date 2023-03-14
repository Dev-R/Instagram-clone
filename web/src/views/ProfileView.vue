<template>
    <div class="bg-black">
        <section 
            class="container max-w-full mx-auto text-center"
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
                    class="lg:col-span-8 lg:grid md:col-span-6 
                    md:col-start-4 md:mt-8 md:p-0
                    col-span-12 p-2">
                    
                    <div 
                        class="md:w-[950px] flex flex-col 
                        space-y-4 flex-nowrap 
                        justify-self-end lg:mr--[64px]">            
                        <!-- Profile Info -->
                        <div class="flex md:space-x-14 md:pl-14 md:pb-8">
                            <!-- User Profile image -->
                            <div>
                                <img 
                                    src="https://loremflickr.com/1024/1280/black" 
                                    class="md:w-36 md:h-36 rounded-full">
                            </div>

                            <!-- Profile data -->
                            <div class="pl-20 bg-black flex flex-col space-y-6">
                                <div class="flex space-x-4 items-center">
                                    <!-- User name -->
                                    <div class="font-sans text-xl font-normal text-white">
                                        hot_souce_56
                                    </div>

                                    <!-- Options -->
                                    <div>
                                        <button 
                                            type="button" 
                                            class="text-gray-900 bg-white hover:bg-gray-100 
                                            border border-gray-200 font-semibold 
                                            rounded-lg text-sm p-1.5 px-3">
                                            Edit Profile
                                        </button>
                                    </div>
                                    <!-- Logged-in user Options -->
                                    <div>
                                        <SVGLoader :icon="'profile-options'" />
                                    </div>
                                </div>
                                <!-- Profile Info -->
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
                        <!-- Tab bar -->
                        <div>
                            <div 
                                class="text-center border-t
                                border-slate-1100">
                                <ul class="flex space-x-14 flex-wrap -mb-px justify-center">

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
                                            <SVGLoader :icon="'profile-posts'" />
                                            
                                            <span class="text-xs ">
                                                POSTS
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

                                            <SVGLoader :icon="'profile-saved'" />

                                            <span class="text-xs subpixel-antialiased ">
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

                                            <SVGLoader :icon="'profile-tagged'" />

                                            <span class="text-xs subpixel-antialiased ">
                                                TAGGED
                                            </span>
                        
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>

                        <!-- Empty Section Messages -->
                        <div class="flex flex-col space-y-2 self-center pt-14">
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

        <!-- Mobile Navbar -->
        <NavBarMobile />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import SVGLoader from '@/components/basics/SVGLoader.vue'
import NavBarMain from '@/components/navbars/NavBarMain.vue'
import NavBarMobile from '@/components/navbars/NavBarMobile.vue'
import CommentModal from '@/components/basics/CommentModal.vue'

import type { PostMedia } from '@/common/models/post.model'

type navBarTabs = 'profile-posts' | 'profile-tagged' | 'profile-saved'

export default defineComponent({
    name: 'Profile',
    setup() {

        // Selectors
        const currentActiveTab = ref<navBarTabs>('profile-posts') // Select profile-posts as default active tab
        const commentModalInfo = ref({
            isToggled: false,
            postId: 0
        })

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

        // Handlers
        const navBarTabSwitcher = (currentTab: navBarTabs) => {
            console.log("Current Tab:", currentTab, currentTab === 'profile-posts')
            currentActiveTab.value = currentTab
        }

        const emptyTabBarBodyMessage = computed(() => {
            switch (currentActiveTab.value) {
                case 'profile-posts':
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
                createdAt: 'February 24',
                likeCount: 10,
                hasLiked: false,
                caption: 'Be like a tree. Stay grounded. Connect with your roots. Turn over a new leaf. Bend before you break. Enjoy your unique natural beauty. Keep growing.',
                carouselMedia: mediasArraySampleA,
                commentCount: 5,
                profilePictureUrl: 'https://loremflickr.com/32/32/girl'
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
        NavBarMobile
    }
})
</script>




<style>

</style>