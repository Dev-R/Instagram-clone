<template>
    <div class="container flex max-w-full w-full h-screen bg-[#1a1a1a] space-y-5 sm:p-2">
        <SwiperContainer
            :centered-slides="true"
            :modules="modules"
            :effect="'cube'"
            :cubeEffect="{
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
            @autoplayTimeLeft="onAutoplayTimeLeft"
            @after-init="initializeSlideInstance"
            @active-index-change="updateActiveSlideInstance"
            :class="'sm:max-h-[877px] sm:max-w-lg sm:w-full sm:h-full h-screen w-screen self-center swiper-container'">
            <swiper-slide
                v-for="(story, index) in stories"
                :key="index">
                <!-- Story Container -->
                <div class="relative sm:w-full sm:h-full h-screen w-screen transition-all duration-300 mx-auto">
                    <!-- Story Progress -->

                    <!-- Progress Bar -->
                    <div 
                        class="absolute inset-x-3 
                        top-2 w-11/12 bg-gray-400 
                        rounded-full h-0.5">
                            <div 
                                class="bg-gray-200 h-0.5 
                                rounded-full" 
                                :style="{ 'width': progressPercentage + '%' }">
                            </div>
                    </div>


                    <!-- Story Header -->
                    <!-- Info Bar -->
                    <div 
                        class="absolute py-2 p-3 text-lg top-5 flex flex-row flex-nowrap justify-between w-11/12">

                        <!-- User Info -->
                        <div class="flex flex-row space-x-2">
                            <!-- Picture -->
                            <img 
                                class="w-8 h-8 rounded-full object-cover relative"
                                :src="story.profilePictureUrl"/>

                            <!-- Username -->
                            <div class="text-sm text-white self-center space-x-1">
                                <span>
                                    {{ story.userName }}
                                </span>
                                
                                <span>
                                    {{ story.expiringAt }}
                                </span>
                            </div>
                        </div>

                        <!-- Story Controllers -->
                        <div class="flex flex-row space-x-4 pt-2 text-white self-end">
                            <!-- Players -->
                            <span @click="">
                                <i 
                                    v-if="1"
                                    class="fa-solid fa-pause
                                    cursor-pointer"></i>
                                <i 
                                    v-else
                                    class="fa-solid fa-play 
                                    cursor-pointer"></i>
                            </span>

                            <!-- Muters -->
                            <span @click="">
                                <i 
                                    v-if="1"
                                    class="fa-solid fa-volume-xmark
                                    Mutecursor-pointer"></i>
                                <i 
                                    v-else
                                    class="fa-solid fa-volume-high
                                    cursor-pointer"></i>
                            </span>

                            <!-- Others -->
                            <i class="fa-solid fa-ellipsis self-center cursor-pointer hidden sm:block"></i>
                            <i 
                                @click="onModalClosed()"
                                class="fa-solid fa-x self-center cursor-pointer block sm:hidden"></i>
                        </div>

                    </div>

                    
                    <!-- Story Body -->

                    <!-- Image -->
                    <img
                        v-if="story.items[0]?.type === 'image'" 
                        class="rounded-lg sm:w-full sm:h-full h-screen w-screen" 
                        :class="commentFocused"
                        :src="story.items[0]?.mediaUrl" 
                        :alt="story.items[0]?.title" />

                    <!-- Video -->
                    <video
                        v-else
                        :src="story.items[0].mediaUrl"
                        :controls="false"
                        :class="commentFocused"
                        class="h-dynamic-screen sm:h-auto"
                        loop
                        defaultMuted
                        playsinline
                        oncontextmenu="return false"
                        preload="auto">
                    </video>

                    <!-- Comment Form -->
                    <div class="absolute inset-x-3 bottom-6 w-11/12 rounded-full h-11 flex space-x-3">
                        <input
                            @focus=""
                            @focusout=""
                            @keyup.enter="sendMessage"
                            tabindex="1"
                            type="text" 
                            class="z-50 bg-transparent border border-gray-300 text-white focus:outline-none text-sm rounded-full
                            block w-full p-2.5" 
                            :placeholder="'Reply to' + ' ' + story.userName" 
                            v-model="commentMessageInput" />
                        <span 
                            @click="updateLikeStatus(story)"
                            class="self-center hover:cursor-pointer hover:scale-90">
                            <SVGLoader 
                                v-if="story.hasLiked" :icon="'like'"/>
                            
                            <SVGLoader 
                                v-else :icon="'unlike'"/>
                        </span>

                        <SVGLoader 
                            :icon="'direct'" :class="'self-center hover:cursor-pointer hover:scale-90'" /> 

                    </div>

                </div>
            </swiper-slide>
        </SwiperContainer>

        <!-- Close mark -->
        <div class="absolute right-6 z-50 hover:cursor-pointer md:block hidden">
            <SVGLoader :icon="'cross-large'"  @click="onModalClosed()"/>
        </div>

        <!-- Instagram Logo -->
        <div class="absolute top-0 left-6 z-50 md:block hidden">
            <SVGLoader :icon="'instagram-large'" />
        </div>

    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref, watch, watchEffect, computed } from 'vue'

import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

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
    SVGLoader
} from '@/components'
import type {
    StoryCarousel
} from '@/common'

export default defineComponent({
    name: "StoryView",
    setup() {

        const stories = ref<StoryCarousel[]>([
        ])

        // Data
        const progressPercentage = ref(0)
        const progressBar = ref(null)
        const commentMessageInput = ref<string | null>(null)

        // Trackers
        const activeSwiperInstance = ref<SwiperInstance>()
        const activeStory = ref<HTMLVideoElement | HTMLImageElement>()
        const activeStoryType = ref<'Image' | 'Video' | null>(null)

        // Checkers
        const isToggled = ref<boolean>(false)
        // const isCommentInputFocused = ref(false)
        // const isStoryPlaying = ref(true) // All stories are playing by default
        // const isStoryMuted = ref(true)

        // Services
        const router = useRouter()
        const toast = useToast()

        // Methods 
        const toggleModel = () => {
            isToggled.value = !isToggled.value
        }

        // Video controllers
        /**
         * Play story video if the current story contains a video
         */
        // const playStoryVideo = () => {
        //     if (activeStoryType.value === 'Video') {
        //         const video = activeStory.value as HTMLVideoElement
        //         video?.play()
        //         matchStoryVideoMute(video)
        //     }
        // }

        /**
         * Pause story video if the current story contains a video
         */
        const pauseStoryVideo = () => {
            if (activeStoryType.value === 'Video') {
                const video = activeStory.value as HTMLVideoElement
                video?.pause()
            }
        }

        /**
         * Mute story video if the current story contains a video
         */
        // const invertMuteStoryVideo = () => {
        //     if (activeStoryType.value === 'Video') {
        //         const video = activeStory.value as HTMLVideoElement
        //         video.muted = !video.muted
        //         matchStoryVideoMute(video)
        //     } else {
        //         unsupportedMediaMute()
        //     }
        // }

        // Story controllers
        /**
         * Play from beginning or Resume story progress
         */
        const resumeStory = () => {
            activeSwiperInstance.value?.autoplay.resume()
            // TODO: Figure away to call this function
            // isStoryPlaying.value = true
            // activeStoryType.value === 'Video' && playStoryVideo()
        }

        /**
         * Pause story progress
         */
        const pauseStory = () => {
            activeSwiperInstance.value?.autoplay.pause()
            // isStoryPlaying.value = false // TODO: Figure away to call this
            pauseStoryVideo()
        }

        // const matchStoryVideoMute = (video: HTMLVideoElement) => {
        //     isStoryMuted.value = video.muted
        // }

        // const muteStory = () => {
        //     isStoryMuted.value = true
        // }

        // const unmuteStory = () => {
        //     isStoryMuted.value = false
        // }

        const onNextStory = () => {
            activeSwiperInstance.value?.slideNext()
        }

        const onPrevStory = () => {
            activeSwiperInstance.value?.slidePrev()
        }

        const onAutoplayTimeLeft = (swiper: SwiperInstance, timeLeft: number, percentage: number) => {
            updateProgressPercentage(percentage)
        }

        // const onCommentFocus = () => {
        //     isCommentInputFocused.value = !isCommentInputFocused.value
        // }

        // const onStoryPlay = () => {
        //     isStoryPlaying.value = !isStoryPlaying.value
        // }

        // const onStoryMute = () => {
        //     invertMuteStoryVideo()
        // }

        // Others
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

            activeStory.value = video || image
            activeStoryType.value = video ? 'Video' : 'Image'
        }

        /**
         * Update active swiper slide and video
         * @param swiper The new active swiper slide
         */
        const updateActiveSlideInstance = (swiper: SwiperInstance) => {
            activeSwiperInstance.value = swiper // Update active swiper slide to current one
            const currentIndex = swiper.activeIndex
            const currenSlide = swiper.slides[currentIndex]
            pauseStoryVideo() // Pause current video if any
            updateActiveStory(currenSlide) // Update active story to current one
            resumeStory() // Resume story

        }

        const sendMessage = () => {
            const message = commentMessageInput.value
            commentMessageInput.value = '' // Clear message area 
            // Prevent spacing values
            if (message?.trim() != '') {
                toast.info('Sent')
            }
        }

        // const unsupportedMediaMute = () => {
        //     toast.info('Video has no sound.')
        // }

        const updateProgressPercentage = (percentage: number) => {
            const newPercentage = (1 - percentage) * 100
            progressPercentage.value = newPercentage >= 100 ? 100 : newPercentage
        }

        const updateLikeStatus = (story: StoryCarousel) => {
            story.hasLiked = !story.hasLiked
        }

        // Watchers
        /**
         * Reset or set percentage progress based on slide index
         */
        watchEffect(() => {
            if (progressPercentage.value >= 100) {
                const swiper = activeSwiperInstance.value
                if (swiper && !swiper.isEnd) {
                    updateProgressPercentage(0)
                    onNextStory()
                }
            }
        })

        /**
         * Pause story progress when comment input is focused
         */
        watchEffect(() => {
            isCommentInputFocused.value ? pauseStory() : resumeStory()
        })


        // /**
        //  * Handle story pauses and plays
        //  */
        // watchEffect(() => {
        //     isStoryPlaying.value ? resumeStory() : pauseStory()
        // })

        // watchEffect(() => {
        //     activeStoryType.value === 'Video' ? playStoryVideo() : muteStory()
        // })



        // Computed
        const commentFocused = computed(() => isCommentInputFocused.value ? 'brightness-50' : '')

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
        })

        return {
            isToggled,
            // isStoryMuted,
            // isStoryPlaying,
            isCommentInputFocused,
            stories,
            progressBar,
            progressPercentage,
            sendMessage,
            commentFocused,
            commentMessageInput,
            // carousel,
            toggleModel,
            updateLikeStatus,
            updateActiveSlideInstance,
            initializeSlideInstance,
            onPrevStory,
            onNextStory,
            onModalClosed,
            // onCommentFocus,
            onAutoplayTimeLeft,
            // onStoryPlay,
            // onStoryMute,
            modules: [
                Mousewheel,
                Pagination,
                EffectCube,
                Autoplay,
                Navigation
            ],
        }
    },
    components: {
        SwiperContainer: Swiper,
        SwiperSlide,
        SVGLoader,
    }
})
</script>

<style>
/* Hide next/back controllers */
.swiper-button-next, .swiper-button-prev {
    color: transparent;
}
</style>