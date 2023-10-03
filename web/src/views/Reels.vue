<template>
    <div 
        :class="isToggledClass"
        class="sm:max-w-lg self-center mx-auto overflow-auto scrollbar scrollbar-none">
        <div class="swiper-container-wrapper">
            <ReelContainer
                :direction="'vertical'"
                :centered-slides="true"
                :space-between="15"
                :slides-per-view="isMobileScreen ? 1.00 : 1.15"
                :loop="reels.length > 3"
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
                <ReelSlide
                    v-for="reel of reels"
                    :key="reel.id"
                    :class="'flex flex-col relative max-w-lg sm:max-h-screen'">
                    <ReelCard 
                        :reel="reel"
                        :active-video="activeVideo"
                        @on-comments="toggleCommentModal(reel.comments)"
                        @on-follow-request="handleFollowRequest"
                        @on-like-state-change="handleLikeStateChange" />
                </ReelSlide>
            </ReelContainer>
        </div>
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
	Swiper as ReelContainer,
    SwiperSlide as ReelSlide
} from 'swiper/vue'

import {
    ReelCard,
    SmallModal,
} from '@/components'

import {
    ScreenBreakpoint,
    ModalSize,
    ModalName,
    type PostComment,
    type ReelPost,
} from '@/common'

import { 
    useModalManagerStore 
} from '@/stores'

import {
    SampleGenerator
} from '@/data'

// Swiper modules
const modules = [Mousewheel, Pagination]

// Sample data
const reels = ref<ReelPost[]>(SampleGenerator.generateRandomReelPosts(5, 8))

// Trackers
const activeSwiperInstance = ref<SwiperInstance>()
const activeVideo = ref<HTMLVideoElement>()
const modalStoreManager = useModalManagerStore()

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
    modalStoreManager.toggleModal(ModalName.REEL)
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

onMounted(() => {
    screenWidth.value = window.innerWidth // Set initial value to current screen size
    // Keep track of screen width in case of change later
    window.onresize = () => {
        screenWidth.value = window.innerWidth
    }
})

const isToggledClass = computed(() => {
    return commentModal.value.isToggled ? "lights-off" : ""
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