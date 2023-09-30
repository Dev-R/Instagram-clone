<template>
	<div class="bg-black">
		<section 
			class="container md:max-w-full mx-auto
			scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': commentModal.isToggled }">
			<div class="md:grid grid-cols-12 flex justify-center">
				<!-- Left bar: Navigation -->
				<div 
					class="xl:col-span-2 col-span-1 bg-black 
                    md:block hidden space-y-12 h-screen 
                    sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>

				<div 
					class="sm:col-span-7 md:col-start-6 sm:max-w-lg self-center 
                    overflow-auto scrollbar scrollbar-none">
					<div class="swiper-container-wrapper">
						<SwiperContainer
							:direction="'vertical'"
							:centered-slides="true"
							:space-between="15"
							:slides-per-view="isMobileScreen ? 1.00 : 1.15"
							:loop="reelItems.length > 3"
							:mousewheel="true"
							:modules="modules"
							:pagination="{
								clickable: false,
								bulletClass: 'hidden'   
							}"
							:class="'max-h-screen h-dynamic-screen sm:h-auto \
                            sm:rounded-lg self-center swiper-container'"
							@afterInit="updateActiveSlideInstance"
							@active-index-change="updateActiveSlideInstance">
							<swiper-slide
								v-for="reel of reelItems"
								:class="'flex flex-col relative max-w-lg sm:max-h-screen'">
								<ReelCard 
									:reel="reel"
									:active-video="activeVideo"
									@on-comments="toggleCommentModal(reel.comments)"
									@on-follow-request="handleFollowRequest"
									@on-like-state-change="handleLikeStateChange" />
							</swiper-slide>
						</SwiperContainer>
					</div>
				</div>
			</div>
		</section>
	</div>
	
	<SmallModal 
		:title="commentModal.title"
		:is-toggled="commentModal.isToggled" 
		:items="commentModal.items"
		:modal-type="ModalName.COMMENT" 
		:modal-size="ModalSize.Medium"
		@on-modal-closed="toggleCommentModal" />

</template>

<script setup lang="ts">
// Swiper styles
import 'swiper/css/bundle'
import 'swiper/css'
import 'swiper/css/pagination'

import {
    ref,
    computed,
    onMounted
} from 'vue'

import SwiperInstance, {
    Mousewheel,
    Pagination
} from 'swiper'

import {
	Swiper as SwiperContainer,
    SwiperSlide
} from 'swiper/vue'

import {
    NavBarMain,
    ReelCard,
    SmallModal,
} from '@/components'

import {
    ScreenBreakpoint,
    ModalSize,
    ModalName,
    type PostComment,
    type ReelMedia,
    type ReelPost,
} from '@/common'

// Swiper modules
const modules = [Mousewheel, Pagination]

// Sample data
const mediasArraySampleA: ReelMedia = {
    type: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/download/mixkit-little-girl-laying-in-the-grass-enjoying-a-chocolate-bunny-49069.mp4',
    title: 'Legendary A',
    location: 'LA'
}

const mediasArraySampleB: ReelMedia = {
    type: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/download/mixkit-eastern-egg-picnic-in-the-garden-48599.mp4',
    title: 'Legendary A',
    location: 'LA'
}

const commentsSample: PostComment[] = [{
    id: 0,
    userName: 'Sara',
    profilePictureUrl: 'https://loremflickr.com/1024/1280/dog',
    content: "\
			Subhanallah x3 \
			Alhamdulillah x3 \
			La ilaha ilallah x3 \
			Astagfirullah x3Astagfirullah x3 \
			Allahu akbar x3",
    createdAt: '2012-02-23'
}]
// Trackers
const activeSwiperInstance = ref<SwiperInstance>()
const activeVideo = ref<HTMLVideoElement>()

// Others
const screenWidth = ref<number>(window.innerWidth) // Current window width
const commentModal = ref({
    name: '',
    title: 'Comments',
    items: [] as PostComment[] | undefined,
    isToggled: false
})


/**
 * Update active swiper slide and video
 * @param swiper The new active swiper slide
 */
const updateActiveSlideInstance = (swiper: SwiperInstance) => {
    pauseVideo()
    activeSwiperInstance.value = swiper // Update active swiper slide to current one
    const currentIndex = swiper.activeIndex
    const currenSlide = swiper.slides[currentIndex]
    updateActiveVideo(currenSlide) // Update active video to current one
}

/**
 * Update the current active video variable to match that of the active slide
 * @param currentSlide Current active slide show
 */
const updateActiveVideo = (currentSlide: HTMLElement) => {
    activeVideo.value = currentSlide?.querySelector(
        'video'
    ) as HTMLVideoElement
    playVideo() // Auto play new active 
}

/**
 * Change the follow state of a post based on user click
 * @param activeReel 
 */
const handleFollowRequest = (activeReel: ReelPost) => {
    activeReel.isFollowed = !activeReel.isFollowed
}

/**
 * Update the like state of a reel based on user click
 * @param id Liked / Unliked post ID
 */
const handleLikeStateChange = (reel: ReelPost) => {
    reel.likeCount += reel.hasLiked ? +1 : -1
    reel.hasLiked = !reel.hasLiked
}

/**
 * Assign the first media slide when swiper is fully mounted
 * @param swiper The first swiper slide
 */
const initializeSlideInstance = (swiper: SwiperInstance) => {
	activeSwiperInstance.value = swiper
}


const toggleCommentModal = (comments: PostComment[] | undefined) => {
    commentModal.value.items = comments
    commentModal.value.isToggled = !commentModal.value.isToggled
}

const pauseVideo = () => {
    activeVideo.value?.pause()
}

const playVideo = () => {
    activeVideo.value?.play()
}

const isMobileScreen = computed(() => {
    return screenWidth.value <= ScreenBreakpoint.Medium
})

const reelItems = ref<ReelPost[]>([{
        id: '0',
        userName: 'Rabee',
        createdAt: 'February 24',
        likeCount: 253,
        hasLiked: true,
        caption: ' Sh. @abdullah_oduro and I getting that Saturday morning work in the gym and talking over @yaqeeninstitute Quran 30 ',
        reelMedia: mediasArraySampleA,
        commentCount: 3,
        isFollowed: false,
        profilePictureUrl: 'https://loremflickr.com/1024/1280/dog',
        comments: commentsSample
    },
    {
        id: '1',
        userName: 'Sara',
        createdAt: 'February 24',
        likeCount: 1255,
        hasLiked: false,
        caption: 'Be like a tree. Stay grounded. Connect with your roots. Turn over a new leaf. Bend before you break. Enjoy your unique natural beauty. Keep growing.',
        reelMedia: mediasArraySampleB,
        commentCount: 5,
        isFollowed: false,
        profilePictureUrl: 'https://loremflickr.com/1024/1280/cat'
    }
])

onMounted(() => {
    screenWidth.value = window.innerWidth // Set initial value to current screen size
    // Keep track of screen width in case of change later
    window.onresize = () => {
        screenWidth.value = window.innerWidth
    }
})
</script>

<style scoped>
.blur-filter {
    filter: blur(30px);
}

.transparent-black {
    background-color: rgba(0,0,0,.5);
}

.transparent-gray {
    background-color:rgba(134, 134, 134, 0.5);
}

/**
* Hide video controllers in mobile phones    
*/
video::-webkit-media-controls-start-playback-button {
    display: none;
}

.swiper-container-wrapper {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

.sticky-test { 
  bottom: env(safe-area-inset-bottom);
}
</style>