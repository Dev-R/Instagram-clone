<template>
	<div class="bg-black">
		<section 
			v-if="!activeModal.isToggled"
            class="container text-center md:max-w-full mx-auto sm:h-screen scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': isModalToggled }">
			<div class="flex">
				<div 
					class="basis-1/6 md:block hidden space-y-12
                    sticky top-0 border-r border-gray-900">
					<NavBarMain
						@on-create="triggerPhotoModal" />
				</div>
                
				<!-- Center -->
                <div class="lg:max-w-4xl h-screen sm:h-auto w-full mx-auto sm:mt-10">
					<!-- Profile Info -->
					<div 
						class="flex flex-col md:w-[935px] flex-nowrap space-y-4 
                        pt-2 md:pt-0 justify-self-end lg:mr-[64px]">            
						<div class="flex md:space-x-14 md:pl-14 md:pb-8">
							<!-- User Profile image -->
							<div>
								<img 
									:src="profileInfo.profilePictureUrl" 
									class="md:w-36 md:h-36 h-20 w-20 rounded-full" />
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
											<span 
												class="sm:text-md text-xs font-semibold"
												@click="goToSettingsRoute">
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
											:icon="'profile-options'"
											:class="'md:block hidden sm:hover:cursor-pointer'" 
											@click="triggerSmallModal(ModalType.Setting, 'Followers')" />
									</div>
								</div>

								<!-- Profile Info Rendering: Desktop -->
								<div class="md:block hidden">
									<div class="flex space-x-10">
										<div 
											v-for="(element, index) of profileInfoElements"
											:key="index"
											class="font-sans text-md font-normal 
                                          text-white sm:hover:cursor-pointer"
											@click="element.onClick">
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
									class="flex flex-col sm:hover:cursor-pointer"
									@click="element.onClick">
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
									class="sm:hover:cursor-pointer" 
									:class="{ 'md:hidden block' : tab.name === ProfileTab.Peeds }"
									@click="navBarTabSwitcher(tab.name as navBarTabs)">
									<div 
										:class="getTabClass(tab.name)">
										<SVGLoader 
											:icon="tab.iconLarge" 
											:class="'md:block hidden'" />
										<SVGLoader 
											:icon="tab.iconSmall" 
											:class="'md:hidden block'" />
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
								class="h-fit w-fit basis-1/3 p-0.5 
                                relative hover:brightness-75 group 
                                hover:cursor-pointer"
								@click="triggerCommentModal(index)">
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

								<img 
									v-if="post.carouselMedia"
									:src="post.carouselMedia[0]?.mediaUrl" />
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
		<div 
			v-if="activeModal.name === ModalType.Profile"
			class="md:max-w-md justify-self-end p-2">
			<PostCard
				:post-item="postItems[activeModal.postId]" />
		</div>

		<CommentModal
			:post-comment="{
				isToggled: activeModal.isToggled && activeModal.name === ModalType.Comment,
				post: postItems[activeModal.postId],
			}" 
			@on-modal-closed="triggerCommentModal" />
        
		<PhotoModal
			:is-toggled="photoModal.isToggled"
			@on-modal-closed="triggerPhotoModal" />

		<FollowModal 
			:modal-size="ModalSize.Medium"
			:title="smallModal.title"
			:items="smallModal.items" 
			:is-toggled="smallModal.isToggled && smallModal.name === ModalType.Follow"
			@on-modal-closed="triggerSmallModal" />

		<SettingModal
			:is-toggled="smallModal.isToggled && smallModal.name === ModalType.Setting"
			@on-modal-closed="triggerSmallModal" />
	</div>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    onMounted,
    onUnmounted
} from 'vue'

import {
    useRouter
} from 'vue-router'

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

import {
    ProfileTab,
    ModalType,
    ModalSize
} from '@/common/enums'

import type {
    navBarTabs,
    ModalName,
    User,
    PostMedia,
    PostCard as PostCardType
} from '@/common/models'


// TODO: Remove this sample data
const mediasArraySampleA: PostMedia[] = [{
        index: 0,
        type: 'image',
        mediaUrl: "https://loremflickr.com/1024/1280/cat",
        title: "Legendary A"
    },
    {
        index: 1,
        type: 'image',
        mediaUrl: "https://loremflickr.com/1024/1280/nature",
        title: "Legendary A"
    }
]

// Data
const currentActiveTab = ref<navBarTabs>(ProfileTab.Posts) // Select profile-posts as default active tab
const windowWidth = ref(window.innerWidth) // Current window width

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
const postItems = ref<PostCardType[]>([{
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
}])

// Services
const router = useRouter()

// Methods
/**
 * Switch between profile tabs
 * @param currentTab Current active tab
 */
const navBarTabSwitcher = (currentTab: navBarTabs) => {
    currentActiveTab.value = currentTab
}

/**
 * Update like state of a post.
 * @param id Liked / Unliked post ID
 */
const triggerCommentModal = (id: number | undefined) => {
    // If screen size > 768 open comment Modal else open Profile Modal
    const modalName = screenSizeType.value === 'xs' ? ModalType.Profile : ModalType.Comment
    activeModal.value = {
        name: modalName,
        isToggled: !activeModal.value.isToggled,
        postId: id ? id : 0
    }
}

/**
 * Trigger photo modal
 */
const triggerPhotoModal = () => {
    photoModal.value.isToggled = !photoModal.value.isToggled
}

/**
 * Trigger small modal
 * @param name Modal name (i.e: Follow, Setting)
 * @param title Modal title 
 */
 const triggerSmallModal = (name: string | undefined, title: string | undefined) => {
    smallModal.value = {
        name: name ? name : '',
        title: title ? title : '',
        isToggled: !smallModal.value.isToggled,
        items: [{
            userName: 'Rabee',
            profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
            suggested: [{
                userName: 'Rabee',
                profilePictureUrl: 'https://loremflickr.com/1024/1080/bird',
                followedBy: 'imamomarsuleiman + 1 more'
            }]
        }]
    }
}

/**
 * Return tab class based on current active tab
 * @param tabName Current tab name
 */
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

/**
 * Go to settings route
 */
const goToSettingsRoute = () => {
    router.push({
        name: 'setting'
    })
}

/**
 * Get current screen width
 */
const onWidthChange = () => windowWidth.value = window.innerWidth

/** 
 * Return current screen size type
 */
const screenSizeType = computed(() => {
    if (windowWidth.value < 550) return 'xs'
    return false
})

/**
 * Return message based on current active tab for empty tab bar body
 */
const emptyTabBarBodyMessage = computed(() => {
    switch (currentActiveTab.value) {
        case ProfileTab.Posts:
        case ProfileTab.Peeds:
            return {
                icon: 'fa-solid fa-photo-film',
                    top: 'Share Photos',
                    body: 'When you share photos, they will appear on your profile.',
                    footer: 'Share your first photo',
                    isEmpty: postItems === undefined || postItems.value.length == 0
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

/**
 * Return true if any modal is toggled
 */
const isModalToggled = computed(() => {
    return activeModal.value.isToggled || smallModal.value.isToggled || photoModal.value.isToggled
})

// Constants
const tabElements = [{
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
const profileInfoElements = [{
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
</script>