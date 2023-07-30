<template>
	<div class="container flex max-w-full w-full sm:h-screen bg-[#1a1a1a] space-y-5 sm:p-2">
		<SwiperContainer
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
			:class="'sm:w-3/12 sm:h-5/6 sm:rounded-lg  w-screen self-center swiper-container'"
			@autoplayTimeLeft="onAutoplayTimeLeft"
			@after-init="initializeSlideInstance"
			@active-index-change="updateActiveSlideInstance">
			<swiper-slide
				v-for="(story, index) in stories"
				:key="index">
				<!-- Story Container -->
				<StoryCard
					:story="story"
					:active-story-media="activeStoryMedia"
					:active-story-type="activeStoryType"
					:progress-percentage="progressPercentage" 
					:is-story-playing="isStoryPlaying" 
					@on-like-status="updateLikeStatus"
					@on-modal-closed="onModalClosed"
					@on-send-message="" />
			</swiper-slide>
		</SwiperContainer>

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

<script lang="ts">
import { defineComponent, ref, provide, watchEffect, onMounted } from 'vue'

import { useRouter } from 'vue-router'

import SwiperInstance, {
	Mousewheel,
	Pagination,
	EffectCube,
	Autoplay,
	Navigation
} from 'swiper'

import {
	Swiper,
	SwiperSlide
} from 'swiper/vue'

import 'swiper/css/bundle'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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

export default defineComponent({
	name: 'StoryView',
	setup() {
        const stories = ref<StoryCarousel[]>([])

		// Data
		const progressPercentage = ref(ZERO_PERCENTAGE)

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

		const updateProgressPercentage = (percentage: number) => {
			const newPercentage = (1 - percentage) * ONE_HUNDRED_PERCENTAGE
			progressPercentage.value = newPercentage >= ONE_HUNDRED_PERCENTAGE ? ONE_HUNDRED_PERCENTAGE : newPercentage
		}

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

		const validateStoryLength = () => {
			if(stories.value.length === 0 ) {
				router.push({ path: '/' })
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
				router.push({ path: '/' })
			}, 100)
		}

		onMounted(() => {
			validateStoryLength()
		})
		// Providers
		provide(
			'pauseStory', pauseStory
		)

		provide(
			'resumeStory', resumeStory
		)

		return {
			isToggled,
			isStoryPlaying,
			stories,
			activeStoryMedia,
			activeStoryType,
			progressPercentage,
			toggleModel,
			updateLikeStatus,
			updateActiveSlideInstance,
			initializeSlideInstance,
			onPrevStory,
			onNextStory,
			onModalClosed,
			onAutoplayTimeLeft,
			modules: [
				Mousewheel,
				Pagination,
				EffectCube,
				Autoplay,
				Navigation
			]
		}
	},
	components: {
		SwiperContainer: Swiper,
		SwiperSlide,
		SVGLoader,
		StoryCard
	},
})
</script>

<style>
/* Hide next/back controllers */
.swiper-button-next, .swiper-button-prev {
    color: transparent;
}
</style>