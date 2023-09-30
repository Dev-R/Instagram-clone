<template>
	<div class="container flex max-w-full w-full sm:h-screen bg-[#1a1a1a] space-y-5 sm:p-2">
		<StoryContainer
			:centered-slides="true"
			:modules="modules"
			:effect="'cube'"
			:cube-effect="{
				shadow: true,
				slideShadows: true,
				shadowOffset: 20,
				shadowScale: 0.94,
			}"
			:autoplay="{
				delay: 25000,
				disableOnInteraction: false,
			}"
			:navigation="{
				enabled: true
			}"
			:class="'sm:max-w-md lg:max-w-lg sm:rounded-lg w-screen self-center swiper-container'"
			@autoplayTimeLeft="onAutoplayTimeLeft"
			@after-init="initializeSlideInstance"
			@active-index-change="updateActiveSlideInstance">
			<StorySlide
				v-for="(story, index) in stories"
				:key="index">
				<StoryCard
					:story="story"
					:active-story-media="activeStoryMedia"
					:active-story-type="activeStoryType"
					:progress-percentage="progressPercentage" 
					:is-story-playing="isStoryPlaying" 
					@on-like-status="updateLikeStatus"
					@on-modal-closed="onModalClosed"
					@on-send-message="" />
			</StorySlide>
		</StoryContainer>

		<!-- Close mark -->
		<div class="absolute right-6 z-50 sm:hover:cursor-pointer md:block hidden">
			<SVGLoader
				:icon="'cross-large'"
				@click="onModalClosed()" />
		</div>

		<!-- Instagram Logo -->
		<div class="absolute top-0 left-6 z-50 md:block hidden">
			<SVGLoader :icon="'instagram-large'" />
		</div>
	</div>
</template>

<script setup lang="ts">
// Swiper styles
import 'swiper/css/bundle'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import {
    ref,
    provide,
    watchEffect,
    onMounted
} from 'vue'

import SwiperInstance, {
    Mousewheel,
    Pagination,
    EffectCube,
    Autoplay,
    Navigation
} from 'swiper'

import {
	Swiper as StoryContainer,
    SwiperSlide as StorySlide
} from 'swiper/vue'

import {
    useRouter
} from 'vue-router'

import {
    SVGLoader,
    StoryCard
} from '@/components'

import {
    type StoryCarousel,
    type StoryType,
    type StoryMedia,
    StoryTypeEnum,
    ZERO_PERCENTAGE,
    ONE_HUNDRED_PERCENTAGE
} from '@/common'

// Swiper modules
const modules = [
    Mousewheel,
    Pagination,
    EffectCube,
    Autoplay,
    Navigation
]


// Data
const progressPercentage = ref(ZERO_PERCENTAGE)
const stories = ref<StoryCarousel[]>([
    {
        id: 0,
        userName: '3_st',
        profilePictureUrl: 'https://loremflickr.com/1024/1080/dog',
        expiringAt: '',
        seen: false,
        items: [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://i.ibb.co/H2jnhww/story-Demo.jpg",
                title: "Legendary A"
            }
        ],
        hasLiked: false,
        mediaCount: 1
    },
    {
        id: 1,
        userName: 'Noura',
        profilePictureUrl: 'https://loremflickr.com/32/32/woman',
        expiringAt: '',
        seen: false,
        items: [
            {
                index: 0,
                type: 'video',
                mediaUrl:
                    "https://assets.mixkit.co/videos/download/mixkit-eastern-egg-picnic-in-the-garden-48599.mp4",
                title: "Legendary A"
            }
        ],
        hasLiked: false,
        mediaCount: 1
    },
    {
        id: 3,
        userName: 'Noura',
        profilePictureUrl: 'https://loremflickr.com/32/32/woman',
        expiringAt: '',
        seen: false,
        items: [
            {
                index: 0,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/490/870/love",
                title: "Legendary A"
            }
        ],
        hasLiked: false,
        mediaCount: 1
    },
])

// Trackers
const activeSwiperInstance = ref<SwiperInstance>()
const activeStoryMedia = ref<StoryMedia>(undefined)
const activeStoryType = ref<StoryType>(null)

// Checkers
const isToggled = ref<boolean>(false)
const isStoryPlaying = ref<boolean>(false)

// Services
const router = useRouter()

// Methods 
const toggleModel = () => {
    isToggled.value = !isToggled.value
}

/**
 * Update the progress percentage of the story
 * @param percentage The percentage of the story
 */
const updateProgressPercentage = (percentage: number) => {
    const newPercentage = (1 - percentage) * ONE_HUNDRED_PERCENTAGE
    progressPercentage.value = newPercentage >= ONE_HUNDRED_PERCENTAGE ? ONE_HUNDRED_PERCENTAGE : newPercentage
}

/**
 * Update the like status of the story
 * @param story The story to update
 */
const updateLikeStatus = (story: StoryCarousel) => {
    story.hasLiked = !story.hasLiked
}

// Story controllers
const resumeStory = () => {
    activeSwiperInstance.value?.autoplay.resume()
}

const pauseStory = () => {
    activeSwiperInstance.value?.autoplay.pause()
}

const onNextStory = () => {
    activeSwiperInstance.value?.slideNext()
}

const onPrevStory = () => {
    activeSwiperInstance.value?.slidePrev()
}

/**
 * Update the progress percentage of the story
 * @param _ 
 * @param __  
 * @param percentage The percentage of the story 
 */
const onAutoplayTimeLeft = (_: SwiperInstance, __: number, percentage: number) => {
    updateProgressPercentage(percentage)
}

const pauseStoryVideo = () => {
    if (activeStoryType.value === StoryTypeEnum.Video) {
        const video = activeStoryMedia.value as HTMLVideoElement
        video?.pause()
    }
}

/**
 * Assign the first media slide when swiper is fully mounted
 * @param swiper The first swiper slide
 */
const initializeSlideInstance = (swiper: SwiperInstance) => {
    activeSwiperInstance.value = swiper
}

/**
 * Update the current active video variable to match that of the active slide
 * @param currentSlide Current active slide show
 */
const updateActiveStory = (currentSlide: HTMLElement) => {
    const image = currentSlide.querySelector('img') as HTMLImageElement
    const video = currentSlide.querySelector('video') as HTMLVideoElement

    activeStoryMedia.value = video || image
    activeStoryType.value = video ? StoryTypeEnum.Video : StoryTypeEnum.Image
}

/**
 * Update active swiper slide and video
 * @param swiper The new active swiper slide
 */
const updateActiveSlideInstance = (swiper: SwiperInstance) => {
    activeSwiperInstance.value = swiper // Update active swiper slide to current one
    const currentIndex = swiper.activeIndex
    const currenSlide = swiper.slides[currentIndex]
    pauseStoryVideo()
    updateActiveStory(currenSlide)
    resumeStory()
}

/**
 * Validate the length of the stories array and redirect to home if empty
 */
const validateStoryLength = () => {
    if (stories.value.length === 0) {
        router.push({
            path: '/'
        })
    }
}
// Watchers
/**
 * Reset or set percentage progress based on slide index
 */
watchEffect(() => {
    if (progressPercentage.value >= ONE_HUNDRED_PERCENTAGE) {
        const swiper = activeSwiperInstance.value
        if (swiper && !swiper.isEnd) {
            updateProgressPercentage(ZERO_PERCENTAGE)
            onNextStory()
        }
    }
})

// Event Listeners
/**
 * Emit signal when the modal is closed
 * @event modal-closed
 */
const onModalClosed = () => {
    setTimeout(() => {
        router.push({
            path: '/'
        })
    }, 100)
}

// Providers for child components
provide(
    'pauseStory', pauseStory
)

provide(
    'resumeStory', resumeStory
)

onMounted(() => {
    validateStoryLength()
})
</script>

<style scoped>
/* Hide next/back controllers */
.swiper-button-next, .swiper-button-prev {
    color: transparent;
}
</style>