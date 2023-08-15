<template>
    <div class="bg-black">
        <section 
            v-if="!activeModal.isToggled"
            class="container max-w-full mx-auto text-center 
            h-screen scrollbar scrollbar-thumb-gray-900"
            :class="{ 'brightness-50 pointer-events-none': isModalToggled }">
            <div class="grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div 
					class="xl:col-span-2 col-span-1 bg-black 
					md:block hidden space-y-12 h-screen 
					sticky top-0 border-r border-gray-900">
                    <NavBarMain
                        @on-create="triggerPhotoModal"/>
                    
                </div>
                
                <!-- Center -->
                <div 
                    class="lg:col-span-8 lg:grid md:col-span-6 scrollbar
                  scrollbar-thumb-gray-900 md:ml-5 lg:ml-0 md:col-start-2 
                    md:mt-8 md:p-0 col-span-12 p-2">
            
                    <!-- Profile Info -->
                    <div 
                        class="flex flex-col md:w-[935px] flex-nowrap space-y-4 
                        pt-2 md:pt-0 justify-self-end lg:mr-[64px]">            
                        <div class="flex md:space-x-14 md:pl-14 md:pb-8">
                            <!-- User Profile image -->
                            <div>
                                <img 
                                    :src="profileInfo.profilePictureUrl" 
                                    class="md:w-36 md:h-36 h-20 w-20 rounded-full">
                            </div>

                            <!-- Profile data -->
                            <div class="md:pl-20 bg-black flex flex-col space-y-6">

                                <div 
                                    class="md:flex md:flex-row flex-col md:space-x-4 
                                    space-y-3 items-center">
                                    <!-- User name -->
                                    <div 
                                        class="md:pl-0 pl-6 font-sans text-lg font-normal
                                      text-white text-left md:mt-4">
                                        {{ profileInfo.userName }}
                                    </div>

                                    <!-- Options -->
                                    <div class="md:pl-0 pl-6">
                                        <TheButton 
                                            :color="'dark'" 
                                            :size="'md'" 
                                            :is-full="true">
                                            <span class="sm:text-md text-xs font-semibold">
                                                Edit Profile
                                            </span>
                                        </TheButton>
                                    </div>

                                    <div class="md:pl-0 pl-6 hidden sm:block">
                                        <TheButton 
                                            :color="'dark'" 
                                            :size="'md'" 
                                            :is-full="true">
                                            <span class="sm:text-md text-xs font-semibold">
                                                View Archive
                                            </span>
                                        </TheButton>
                                    </div>

                                    <!-- Logged-in user Options -->
                                    <div>
                                        <SVGLoader 
                                            @click="triggerSmallModal(ModalType.Setting, 'Followers')"
                                            :icon="'profile-options'" 
                                            :class="'md:block hidden sm:hover:cursor-pointer'"/>
                                    </div>
                                </div>

                                <!-- Profile Info Rendering: Desktop -->
                                <div class="md:block hidden">

                                    <div class="flex space-x-10">

                                        <div 
                                        v-for="(element, index) of profileInfoElements"
                                            :key="index"
                                            @click="element.onClick"
                                            class="font-sans text-md font-normal 
                                          text-white sm:hover:cursor-pointer">
                                            <span class="font-sans text-sm font-bold text-white">
                                                {{ element.value }}
                                            </span>
                                            {{ element.title }}
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                        <!-- Profile Info Rendering: Mobile -->
                        <div 
                            class="text-center border-t 
                            md:hidden block border-slate-1100 mt-2">
                            <ul 
                                class="flex space-x-14 flex-wrap 
                                justify-around pt-3 pl-4 pr-4">

                                <div 
                                    v-for="(element, index) of profileInfoElements"
                                    :key="index"
                                    @click="element.onClick"
                                    class="flex flex-col sm:hover:cursor-pointer">

                                    <span class="text-sm subpixel-antialiase text-white">
                                        {{ element.value }}
                                    </span>

                                    <span class="text-sm subpixel-antialiase text-gray-400">
                                        {{ element.title }}
                                    </span>

                                </div>

                            </ul>
                        </div>

                        <!-- Tab bar Rendering Section-->
                        <div class="text-center border-t border-slate-1100">
                            <ul 
                                class="flex space-x-14 flex-wrap -mb-px 
                                md:justify-center justify-between sm:px-6">

                                <li 
                                    v-for="(tab, index) in tabElements" 
                                    :key="index" 
                                    @click="navBarTabSwitcher(tab.name as navBarTabs)" 
                                    class="sm:hover:cursor-pointer"
                                    :class="{'md:hidden block' : tab.name === ProfileTab.Peeds}">
                                    <div 
                                        :class="getTabClass(tab.name)">
                                        <SVGLoader 
                                            :icon="tab.iconLarge" 
                                            :class="'md:block hidden'"/>
                                        <SVGLoader 
                                            :icon="tab.iconSmall" 
                                            :class="'md:hidden block'"/>
                                        <span class="text-xs subpixel-antialiased hidden md:block">
                                            {{ tab.label }}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <!-- Empty Section Messages Rendering Section -->
                        <div 
                            v-if="emptyTabBarBodyMessage.isEmpty"
                            class="flex flex-col space-y-2 self-center pt-14 h-screen">
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
                        
                        <!-- Image Rendering Section -->
                        <div 
                            v-if="currentActiveTab === ProfileTab.Posts"
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

        <!-- Modals -->

        <!-- PostCard Modal -->
        <div 
            v-if="activeModal.name === ModalType.Profile"
            class="md:w-[470px] justify-self-end p-2">
            <PostCard
                :post-item="postItems[activeModal.postId]"/>
        </div>

        <!-- Comment Modal -->
        <CommentModal
            @on-modal-closed="triggerCommentModal" 
            :post-comment="{
                isToggled: activeModal.isToggled && activeModal.name === ModalType.Comment,
                post: postItems[activeModal.postId],
            }"/>
        
        <!-- Photo Modal -->
        <PhotoModal
            @on-modal-closed="triggerPhotoModal"
            :is-toggled="photoModal.isToggled" />

        <!-- Followers/ Following Modal -->
        <FollowModal 
            @on-modal-closed="triggerSmallModal"
		    :modal-size="ModalSize.Medium"
            :title="smallModal.title" 
            :items="smallModal.items" :is-toggled="smallModal.isToggled && smallModal.name === ModalType.Follow" />

        <!-- Quick Setting Modal -->
        <SettingModal
            @on-modal-closed="triggerSmallModal"
            :is-toggled="smallModal.isToggled && smallModal.name === ModalType.Setting"/>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'

import {
    SVGLoader,
    NavBarMain,
    PostCard,
    SmallModal as FollowModal,
    SettingModal,
    CommentModal,
    PhotoModal,
    TheButton
} from '@/components'

import type {
    navBarTabs,
    ModalName,
    User,
    PostMedia
} from '@/common'

import {
    ProfileTab,
    ModalType,
    ModalSize
} from '@/common'

export default defineComponent({
    name: 'ProfileView',
    setup() {

        // Selectors
        const currentActiveTab = ref<navBarTabs>(ProfileTab.Posts) // Select profile-posts as default active tab

        // Modals data
        const activeModal = ref({
            name: '' as ModalName,
            isToggled: false,
            postId: 0
        })
        const photoModal = ref({
            isToggled: false,
            currentStep: ''
        })
        const smallModal = ref({
            name: '',
            title: '',
            items: [] as any,
            isToggled: false
        })

        // Others
        let windowWidth = ref(window.innerWidth) // Current window width
        const profileInfo = ref<User>({
            id: '0',
            firstName: 'Alex',
            lastName: 'Boo',
            userName: 'Alex_boo',
            profilePictureUrl: 'https://loremflickr.com/1024/1280/holiday',
            dateJoined: '01-01-2012',
            followerCount: 0,
            followingCount: 0,
            mediaCount: 50,
            mediaItems: [],
        })
        const savedItems = ref<Object[]>([])
        const taggedItems = ref<Object[]>([])

        // Handlers
        const navBarTabSwitcher = (currentTab: navBarTabs) => {
            currentActiveTab.value = currentTab
        }

        const triggerCommentModal = (id: number | undefined) => {
            // If screen size > 768 open comment Modal else open Profile Modal
            const modalName = screenSizeType.value === 'xs' ? ModalType.Profile : ModalType.Comment
            activeModal.value = { name: modalName, isToggled: !activeModal.value.isToggled, postId: id ? id : 0 }
        }

        const triggerPhotoModal = () => {
            photoModal.value.isToggled = !photoModal.value.isToggled
        }

        const triggerSmallModal = (name: string | undefined, title: string | undefined) => {
            smallModal.value = { name: name ? name : '', title: title ? title : '', isToggled: !smallModal.value.isToggled, items: suggested }
        }

        const getTabClass = (tabName: string) => {
            return {
                'flex items-center space-x-2 inline-block py-4 p-1 border-t-2 border-gray-300 sm:hover:border-gray-300': true,
                'border-transparent text-gray-200': currentActiveTab.value !== tabName && tabName !==
                    ProfileTab.Saved && tabName !== ProfileTab.Tagged,
                'border-transparent text-gray-300': currentActiveTab.value !== tabName && (tabName ===
                    ProfileTab.Saved || tabName === ProfileTab.Tagged),
                'text-white': currentActiveTab.value === tabName,
                'sm:hover:text-gray-300': currentActiveTab.value !== tabName && (tabName === ProfileTab.Saved ||
                    tabName === ProfileTab.Tagged),
            }
        }
        
        // Listeners
        const onWidthChange = () => windowWidth.value = window.innerWidth

        // Computed
        const screenSizeType = computed(() => {
            if (windowWidth.value < 550) return 'xs'
            return false
        })

        const emptyTabBarBodyMessage = computed(() => {
            switch (currentActiveTab.value) {
                case ProfileTab.Posts:
                case ProfileTab.Peeds:
                    return {
                        icon: 'fa-solid fa-photo-film',
                        top: 'Share Photos',
                        body: 'When you share photos, they will appear on your profile.',
                        footer: 'Share your first photo',
                        isEmpty: postItems === undefined || postItems.length == 0
                    }
                case ProfileTab.Tagged:
                    return {
                        icon: 'fa-solid fa-users-viewfinder',
                        top: 'Start Saving',
                        body: 'Save photos and videos to your collection.',
                        footer: 'Add to collection',
                        isEmpty: taggedItems === undefined || taggedItems.value.length == 0

                    }
                case ProfileTab.Saved:
                    return {
                        icon: 'fa-regular fa-bookmark',
                        top: 'Photos of you',
                        body: "When people tag you in photos, they'll appear here.",
                        footer: '',
                        isEmpty: savedItems === undefined || savedItems.value.length == 0
                    }
                default:
                    return {}
            }
        })

        const isModalToggled = computed(() => {
            return activeModal.value.isToggled || smallModal.value.isToggled || photoModal.value.isToggled
        })

        // Dynamic elements array
        const tabElements = [
            {
                name: ProfileTab.Posts,
                label: 'POSTS',
                iconLarge: 'profile-posts-large',
                iconSmall: 'profile-posts-small',
                onClick: () => navBarTabSwitcher(ProfileTab.Posts)
            },
            {
                name: ProfileTab.Peeds,
                label: 'Peeds',
                iconLarge: '',
                iconSmall: 'profile-peed-small',
                onClick: () => navBarTabSwitcher(ProfileTab.Peeds)
            },
            {
                name: ProfileTab.Saved,
                label: 'SAVED',
                iconLarge: 'profile-saved-large',
                iconSmall: 'profile-saved-small',
                onClick: () => navBarTabSwitcher(ProfileTab.Saved)
            },
            {
                name: ProfileTab.Tagged,
                label: 'TAGGED',
                iconLarge: 'profile-tagged-large',
                iconSmall: 'profile-tagged-small',
                onClick: () => navBarTabSwitcher(ProfileTab.Tagged)
            },
        ]

        const profileInfoElements = [
            {
                title: 'posts',
                value: profileInfo.value.mediaCount,
                onClick: () => {},
            },
            {
                title: 'followers',
                value: profileInfo.value.followerCount,
                onClick: () => triggerSmallModal(ModalType.Follow, 'Followers'),
            },
            {
                title: 'following',
                value: profileInfo.value.followingCount,
                onClick: () => triggerSmallModal(ModalType.Follow, 'Following'),
            }
        ]

        // Lifecycle Hooks 
        onMounted(() => window.addEventListener('resize', onWidthChange))
        onUnmounted(() => window.removeEventListener('resize', onWidthChange))
        
        // Sample Data
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
                profilePictureUrl: 'https://loremflickr.com/32/32/bird',
                isFollowed: false
            }
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
            }
        ]

        return {
            // Data
            suggested,
            postItems,
            savedItems,
            taggedItems,
            activeModal,
            smallModal,
            photoModal,
            tabElements,

            // Enums
            ProfileTab,
            ModalType,
            ModalSize,

            // Computed
            emptyTabBarBodyMessage,
            isModalToggled,

            currentActiveTab,
            profileInfo,
            profileInfoElements,

            // Methods
            triggerCommentModal,
            triggerSmallModal,
            triggerPhotoModal,
            getTabClass,
            navBarTabSwitcher,
        }
    },
    components: {
        SVGLoader,
        NavBarMain,
        TheButton,
        PostCard,
        FollowModal,
        SettingModal,
        PhotoModal,
        CommentModal
    }
})
</script>




<style>

</style>