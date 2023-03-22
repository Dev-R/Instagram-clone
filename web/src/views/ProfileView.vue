<template>
    <div class="bg-black relative">
        <section 
            v-if="!commentModal.isToggled"
            class="container max-w-full mx-auto text-center h-screen  scrollbar scrollbar-thumb-gray-900"
            :class="{ 'brightness-50 pointer-events-none': commentModal.isToggled || smallModal.isToggled }">
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
                        class="md:w-[935px] flex flex-col
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
                                    <div class="md:pl-0 pl-6 font-sans text-lg font-normal text-white text-left md:mt-4">
                                        hot_souce_56
                                    </div>

                                    <!-- Options -->
                                    <div class="md:pl-0 pl-6">
                                        <button 
                                            type="button" 
                                            class="text-gray-900 bg-white hover:bg-gray-100 
                                            border border-gray-200 font-semibold w-auto
                                            rounded-lg text-xs md:p-1.5 md:px-3 md:py-1.5 px-20 py-1 md:w-auto  ">
                                            Edit Profile
                                        </button>
                                    </div>
                                    <!-- Logged-in user Options -->
                                    <div>
                                        <SVGLoader 
                                            @click="triggerSmallModal('setting-modal', 'Followers')"
                                            :icon="'profile-options'" 
                                            :class="'md:block hidden hover:cursor-pointer'"/>
                                    </div>
                                </div>
                                <!-- Profile Info: Desktop -->
                                <div class="md:block hidden">
                                    <div class="flex space-x-10">
                                        <!-- Number of posts -->
                                        <div class="font-sans text-sm font-normal text-white">
                                            <span class="font-sans text-sm font-bold text-white">
                                                2
                                            </span>
                                            posts
                                        </div>
                                        <!-- Number of followers -->
                                    <div 
                                         @click="triggerSmallModal('follow-modal', 'Followers')"
                                        class="font-sans text-sm font-normal text-white hover:cursor-pointer">
                                        <span class="font-sans text-sm font-bold text-white">
                                                8
                                            </span>
                                            followers
                                        </div>
                                        <!-- Number of following -->
                                        <div 
                                            @click="triggerSmallModal('follow-modal', 'Following')"
                                            class="font-sans text-sm font-normal text-white hover:cursor-pointer">
                                            <span class="font-sans text-sm font-bold text-white">
                                                47
                                            </span>
                                            following
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Profile Info: Mobile -->
                        <div 
                            class="text-center border-t md:hidden block
                            border-slate-1100 mt-2">
                            <ul class="flex space-x-14 flex-wrap justify-around pt-3 pl-4 pr-4">
                                <!-- Posts Tab -->

                                <div class="flex flex-col hover:cursor-pointer">
                                    <span class="text-sm subpixel-antialiase text-white">
                                            85
                                    </span>
                                    <span class="text-sm subpixel-antialiase text-gray-400">
                                            post
                                    </span>
                                </div>

                                <div 
                                @click="triggerSmallModal('follow-modal', 'Followers')"
                                    class="flex flex-col hover:cursor-pointer">

                                        <span class="text-sm subpixel-antialiase text-white">
                                                84
                                        </span>

                                        <span class="text-sm subpixel-antialiase text-gray-400">
                                                followers
                                        </span>
                                        
                                </div>

                                <div 
                                @click="triggerSmallModal('follow-modal', 'Following')"
                                    class="flex flex-col hover:cursor-pointer">
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
                        
                        <!-- Image Rendering Section -->
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
        <div 
            v-else-if="commentModal.name === 'profile-modal'"
            class="md:w-[470px] justify-self-end p-2">
            <PostCard
                :post-item="postItems[commentModal.postId]"/>
        </div>
        <!-- Comment Modal -->
        <CommentModal
            v-else-if="commentModal.name === 'comment-modal'"
            @on-modal-closed="triggerCommentModal" 
            :post-comment="{
                isToggled: commentModal.isToggled,
                post : postItems[commentModal.postId],
            }"/>
        
        <!-- Followers/ Following Modal -->
        <smallModal 

            @on-modal-closed="triggerSmallModal"
            :title="smallModal.title" 
            :items="smallModal.items" :is-toggled="smallModal.isToggled && smallModal.name === 'follow-modal'" />

        <!-- Quick Setting Modal -->
        <settingModal
            @on-modal-closed="triggerSmallModal"
            :is-toggled="smallModal.isToggled && smallModal.name === 'setting-modal'"/>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import type { ComputedRef } from 'vue'

import SVGLoader from '@/components/basics/SVGLoader.vue'
import PostCard from '@/components/basics/PostCard.vue'
import NavBarMain from '@/components/navbars/NavBarMain.vue'
import CommentModal from '@/components/basics/CommentModal.vue'

import type { PostMedia, SuggestionCard } from '@/common/models/Post.model'

import smallModal from '@/components/basics/smallModal.vue'
import settingModal from '@/components/basics/settingModal.vue'

type navBarTabs = 'profile-posts' | 'profile-tagged' | 'profile-saved' | 'profile-peed'
type commentModalName = 'profile-modal' | 'comment-modal' | 'other-modal'


export default defineComponent({
    name: 'ProfileView',
    setup() {

        // Selectors
        const currentActiveTab = ref<navBarTabs>('profile-posts') // Select profile-posts as default active tab

        const commentModal = ref({
            name: '' as commentModalName,
            isToggled: false,
            postId: 0
        })

        const smallModal = ref({
            name: '' ,
            title: '',
            items: [] as any,
            isToggled: false
        })
        // Checkers
        const isCommentModalOpen = ref(false)
        let windowWidth = ref(window.innerWidth) // Current windo width

        // Computed
        // const findNumberOfLikes = computed(() => {
        //     return postItem.likeCount >= 1 ? `${postItem.likeCount} Likes` : 'Be the first to like this' 
        // })

        const triggerCommentModal = (id: number | undefined) => {
            const { width, type } = useBreakpoints()
            
            console.log(" width, type", width.value, type.value)

            console.log('triggerCommentModal:', id)


            const modalName = type.value === 'xs' ? 'profile-modal' : 'comment-modal' // If screen size > 768 open comment Modal else open Profile Modal

            commentModal.value = {name: modalName , isToggled: !commentModal.value.isToggled, postId: id ? id : 0 }
            // commentcommentModal.value = { 'isToggled': !commentcommentModal.value.isToggled, postId: id ? id : 0 }
        }


        const triggerSmallModal = (name: string | undefined, title: string | undefined) => {

            smallModal.value = {name: name ? name : '', title: title ? title : '', isToggled: !smallModal.value.isToggled, items: suggested}
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
            isCommentModalOpen.value = true
            console.log("Emitting signal:", postId)
        }


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

        /**
         * A Vue composition function that provides reactive properties for the current window width
         * and breakpoint type (xs, md, lg). The breakpoint values are based on commonly used
         * device widths.
         *
         * @returns an object with the following properties:
         * - width: a reactive property with the current window width
         * - type: a reactive property with the current breakpoint type (xs, md, lg)
         */
        function useBreakpoints(): { width: ComputedRef<number>; type: ComputedRef<"xs" | "md" | "lg" | null> } {

            const type = computed(() => {
                if (windowWidth.value < 550) return 'xs'
                if (windowWidth.value >= 550 && windowWidth.value < 1200) return 'md'
                if (windowWidth.value >= 1200) return 'lg'
                return null // This is an unreachable line, simply to keep eslint happy.
            })

            const width = computed(() => windowWidth.value)

            return { width, type }
        }
        
        const onWidthChange = () => windowWidth.value = window.innerWidth
        onMounted(() => window.addEventListener('resize', onWidthChange))
        onUnmounted(() => window.removeEventListener('resize', onWidthChange))

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
                carouselMedia: mediasArraySampleB,
                commentCount: 152,
                profilePictureUrl: 'https://loremflickr.com/32/32/girl'
            },
        ]
        const suggested = [
            {
                userName: 'Rabee',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Adil',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/cat',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'https://loremflickr.com/1024/1080/dog',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Ahmed',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/death',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'http://via.placeholder.com/32x32',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Rabee',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Adil',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/cat',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'https://loremflickr.com/1024/1080/dog',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Ahmed',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/death',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'http://via.placeholder.com/32x32',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Rabee',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Adil',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/cat',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'https://loremflickr.com/1024/1080/dog',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Ahmed',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/death',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'http://via.placeholder.com/32x32',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Rabee',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Adil',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/cat',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'https://loremflickr.com/1024/1080/dog',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            },
            {
                userName: 'Ahmed',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/death',
                suggested: [{
                    userName: 'Rabee',
                    profilePictureUrl: 'http://via.placeholder.com/32x32',
                    followedBy: 'imamomarsuleiman + 1 more'
                }]
            }
    ]

        return {
            suggested,
            postItems,
            commentModal,
            smallModal,
            currentActiveTab,
            triggerCommentModal,
            navBarTabSwitcher,
            triggerSmallModal,
            emptyTabBarBodyMessage,
        }
    },
    components: {
    SVGLoader,
    NavBarMain,
    CommentModal,
    PostCard,
    smallModal,
    settingModal
}
})
</script>




<style>

</style>