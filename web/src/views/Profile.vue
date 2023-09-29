<template>
	<div class="bg-black">
		<section 
			class="container text-center md:max-w-full mx-auto sm:h-screen scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': isModalToggled }">
			<div class="flex">
				<div 
					class="basis-1/6 md:block hidden space-y-12
                    sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>
                
				<!-- Center -->
				<div class="lg:max-w-4xl h-screen sm:h-auto w-full mx-auto sm:mt-10">
					<div 
						class="flex flex-col md:w-[935px] flex-nowrap space-y-4 
                        pt-2 md:pt-0 justify-self-end lg:mr-[64px]">
						<!-- TODO: Event listeners -->
						<ProfileHeader 
							:user="profileInfo" />
						
						<!-- TODO: Event listeners	-->
						<ProfileStatsMobile 
                            @open-modal="triggerSmallModal"
							:user="profileInfo" />

						
						<ProfileTabBar 
							@switch-tab="navBarTabSwitcher" />

						<!-- TODO: Remove hard codded boolean -->
						<ProfileEmptyTabMessage 
							:current-active-tab="currentActiveTab"
							:is-saved-tab-empty="false"
							:is-post-or-peed-tab-empty="false"
							:is-tagged-tab-empty="false" />
                        

						<!-- TODO: Post Card Modal 
                            // If screen size > 768 open comment Modal else open Profile Modal
                            const modalName = screenSizeType.value === 'xs' ? ModalType.Profile : ModalType.Comment
                            /** 
                            * Return current screen size type
                            */
                            const screenSizeType = computed(() => {
                                if (windowWidth.value < 550) return 'xs'
                                return false
                            })
                            const windowWidth = ref(window.innerWidth) // Current window width
                            /**
                            * Get current screen width
                            */
                            const onWidthChange = () => windowWidth.value = window.innerWidth
                            // Lifecycle Hooks 
                            onMounted(() => window.addEventListener('resize', onWidthChange))
                            onUnmounted(() => window.removeEventListener('resize', onWidthChange))
                        -->
						<PostCoverCard
							v-if="currentActiveTab === ProfileTab.Posts"
							:posts="postItems" />

						<ProfileFooter />
					</div>
				</div>
			</div>
		</section>

		<!-- Modals -->    
		<FollowModal 
			:modal-size="ModalSize.Medium"
			:title="smallModal.title"
			:items="smallModal.items" 
			:is-toggled="smallModal.isToggled && smallModal.name === ModalType.Follow"
			@on-modal-closed="triggerSmallModal" />
	</div>
</template>

<script setup lang="ts">
import {
    ref,
    computed
} from 'vue'

import {
    NavBarMain,
    SmallModal as FollowModal,
	ProfileHeader,
	ProfileStatsMobile,
    ProfileTabBar,
    ProfileEmptyTabMessage,
    PostCoverCard,
    ProfileFooter
} from '@/components'

import {
    ProfileTab,
    ModalType,
    ModalSize
} from '@/common/enums'

import type {
    NavBarTabs,
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
const currentActiveTab = ref<NavBarTabs>(ProfileTab.Posts) // Select profile-posts as default active tab

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

// Methods
/**
 * Switch between profile tabs
 * @param currentTab Current active tab
 */
const navBarTabSwitcher = (currentTab: NavBarTabs) => {
    currentActiveTab.value = currentTab
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
 * Return true if any modal is toggled
 */
const isModalToggled = computed(() => {
    return smallModal.value.isToggled
})
</script>