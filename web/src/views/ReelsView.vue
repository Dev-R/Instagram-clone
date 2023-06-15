<template>
	<div class="bg-black">
		<section 
			class="container md:max-w-full mx-auto
			scrollbar scrollbar-thumb-gray-900">
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

                     <!--
                        :slidesPerView="1.15" 
                    -->
                    <div class="swiper-container-wrapper">
                        <SwiperContainer
                            @afterInit="updateActiveSlideInstance"
                            @active-index-change="updateActiveSlideInstance"
                            :direction="'vertical'"
                            :centeredSlides="true"
                            :spaceBetween="15"
                            :loop="true"
                            :mousewheel="true"
                            :pagination="{
                                clickable: false,
                                bulletClass: 'hidden'   
                            }"
                            :class="'max-h-screen h-dynamic-screen sm:h-auto sm:rounded-lg self-center swiper-container'"
                            :modules="modules">

                            <swiper-slide
                                :class="'flex flex-col relative max-w-lg sm:max-h-[868.5px]'">

                                <!-- <img src="https://i.ibb.co/Yh0C772/img.png" class="absolute blur-filter h-4/4">  -->
                                <div class="relative sm:max-h-[868.5px]">
                                    
                                    <video
                                        v-on="{ click: isVideoPlaying ? () => pauseVideo() : () => playVideo() }"
                                        :controls="false"
                                        data-slide-type="video"
                                        autoplay
                                        loop
                                        defaultMuted
                                        playsinline
                                        oncontextmenu="return false"
                                        preload="auto"
                                        @play="updateVideoPlayingStatus"
                                        :muted="isVideoMuted"
                                        src="https://player.vimeo.com/external/458873588.sd.mp4?s=0bc2654e0d044d2a06cb13a7cc24bc278c3ed079&profile_id=165&oauth2_token_id=57447761"
                                        class="sm:rounded cursor-pointer h-dynamic-screen sm:h-auto max-w-none md:max-w-full md:w-11/12">
                                        <!-- max-w-none  -->
                                    </video>

                                    <!-- Mute Button -->
                                    <button
                                        id="data-carousel-mute"
                                        type="button"
                                        class="absolute top-3 z-50
                                        sm:flex items-center justify-center
                                        cursor-pointer group hidden
                                        focus:outline-none"
                                        @click="toggleVideoMute">

                                        <span
                                            class="inline-flex items-center justify-center
                                            lg:w-8 lg:h-8 w-6 h-6 rounded-full
                                            group-focus:outline-none transparent-gray">

                                            <i
                                            class="fa-solid
                                            text-sm text-gray-300"
                                            :class="{
                                                'fa-volume-high': !isVideoMuted,
                                                'fa-volume-xmark': isVideoMuted,
                                            }">
                                            </i>

                                        </span>
                                    </button>

                                    <!-- Play Button -->
                                    <button
                                        id="data-carousel-play"
                                        type="button"
                                        class="absolute top-0
                                        sm:left-56 left-1/2 z-30 duration-300 ease-in-out
                                        sm:flex items-center justify-center
                                        h-full cursor-pointer group hidden
                                        focus:outline-none">

                                        <span
                                            :class="{
                                                'invisible w-full h-full' : isVideoPlaying
                                            }"
                                            class="inline-flex items-center transparent-black
                                            justify-center rounded-full w-16 h-16
                                            group-focus:outline-none">
                                            <i
                                                class="fa-solid
                                                text-2xl text-gray-300"
                                                :class="{
                                                    'fa-play': !isVideoPlaying,
                                                }">
                                            </i>
                                        </span>
                                    </button>

                                    <div class="absolute bottom-3 left-5 flex flex-col space-y-3 basis-full">
                                        <SmallCard
                                            @on-action-click="handleFollowRequest"
                                            profile-image="https://i.ibb.co/JQVbxyH/img.jpg">

                                            <template v-slot:user-name>
                                                {{ 'Rabi' }}
                                            </template>

                                            <template
                                                v-slot:action-name>
                                                {{ isFollowed ? 'Following' : 'Follow' }}
                                            </template>

                                        </SmallCard>

                                        <div class="text-white font-normal text-sm">
                                            Living like its my last 🤙🏻🔥
                                        </div>

                                        <div class="flex flex-row flex-nowrap">
                                            <!-- Music -->
                                            <div class="text-sm font-sans text-white flex flex-row">
                                                <i class="fa-solid fa-music text-white text-xs p-1">
                                                </i>

                                                <div class="relative flex overflow-x-hidden">
                                                    <div class="animate-marquee whitespace-nowrap">
                                                        <span class="text-xs mx-4">Marquee Item 1</span>
                                                    </div>

                                                    <div class="absolute top-0 animate-marquee2 whitespace-nowrap">
                                                        <span class="text-xs mx-4">Marquee Item 1</span>
                                                    </div>
                                                </div>

                                            </div>

                                            <!-- Location -->
                                            <div class="text-sm font-sans text-white">
                                                <i class="fa-solid fa-location-dot text-xs p-1"></i>
                                                <span>
                                                    San Francisco, California
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <!-- Side Buttons -->
                                <div class="absolute flex flex-col inset-y-2/3 right-0 space-y-7">
                                    <!-- Like -->
                                    <div class="flex flex-col hover:brightness-50 cursor-pointer">
                                        <i class="fa-regular fa-heart text-white text-2xl"></i>
                                        <div class="text-xs font-sans text-white">750K</div>
                                    </div>

                                    <div class="flex flex-col hover:brightness-50 cursor-pointer">
                                        <i class="fa-regular fa-comment text-white text-2xl"></i>
                                        <div class="text-xs font-sans text-white">7,225</div>
                                    </div>

                                    <div class="flex flex-col hover:brightness-50 cursor-pointer">
                                        <i class="fa-regular fa-paper-plane text-white text-2xl"></i>
                                    </div>

                                    <div class="flex flex-col hover:brightness-50 cursor-pointer self-center">
                                        <i class="fa-regular fa-bookmark text-white text-2xl"></i>
                                    </div>
    

                                </div>
                            </swiper-slide>

                        </SwiperContainer>
                    </div>
                </div>
			</div>
		</section>
	</div>
</template>
<script lang="ts">
// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperInstance, { Mousewheel, Pagination } from 'swiper';

import { NavBarMain, SmallCard } from '@/components'
import { onMounted, defineComponent, ref } from 'vue'
/**
 * TODO:
 *  -   Add video controllers
 * 
 */
export default defineComponent({
    name: "Reels",
    setup() {
        // Others
        const WAITING_TIME_IN_SECONDS = 1000000000000


        // Trackers
        const isFollowed = ref<boolean>(false)

        // Video trackers
        var timeout = null
        const currentActiveMediaSlide = ref <SwiperInstance>()
        const currentActiveVideo = ref<HTMLVideoElement>()
        // const videoPlayingStatus = ref(VideoPlayingState.PausingState)

        // Video handlers
        const isVideoMuted = ref<boolean>(true) // Check if video is currently muted or not
        const isVideoPlaying = ref<boolean>(false) // Check if video is playing or not

        

        const onSwiper = (swiper: any) => {
            console.log(swiper)
        }
        const onSlideChange = () => {
            console.log('slide change')
        }


        const goToNextSlide = () => {
            currentActiveMediaSlide.value?.slideNext()
        }

        const goToPrevSlide = () => {
            currentActiveMediaSlide.value?.slidePrev()
        }

        const runNext = () => {
            timeout = setTimeout(function () {
                goToNextSlide()
            }, WAITING_TIME_IN_SECONDS)
            console.log('Image switched')
        }


        /**
         * Mutes or unmutes the current Active video.
         */
        const toggleVideoMute = () => {
            const video = currentActiveVideo.value
            isVideoMuted.value = !video?.muted
        }


        /**
         * Pauses the current active video.
         * 
         */
        const pauseVideo = () => {
            const video = currentActiveVideo.value
            video?.pause()
            updateVideoPlayingStatus()
        }

        /**
         * Plays the current active video.
         */
        const playVideo = () => {
            const video = currentActiveVideo.value
            video?.play()
            updateVideoPlayingStatus()
        }


        const updateActiveSlideInstance = (swiper: SwiperInstance) => {
            currentActiveMediaSlide.value = swiper
            var currentIndex = swiper.activeIndex
            var currenSlide = swiper.slides[currentIndex]
            updateActiveVideo(currenSlide)
            
            console.log("Active instance updated:", currentActiveVideo.value)
        }


        /**
         * Update the current active video variable to match that of active slide
         * @param currentSlide Current active slide show
         */
        const updateActiveVideo = (currentSlide: HTMLElement ) => {
            currentActiveVideo.value = currentSlide.querySelector('video') as HTMLVideoElement
        }


        const handleFollowRequest = () => {
            console.log("Follow request received")
            isFollowed.value = !isFollowed.value
        }

        /**
         * Update is video playing flag for tracking
         */
        const updateVideoPlayingStatus = () => {
            const video = currentActiveVideo.value
            isVideoPlaying.value = !video?.paused
            // console.log('Playing', !video.paused)
        }
        
        const initializeSlideInstance = (swiper: SwiperInstance) => {
            currentActiveMediaSlide.value = swiper
        }


        // const handleSlideChange = (swiper: SwiperInstance) => {
        //     currentActiveMediaSlide.value = swiper
            // var currentIndex = swiper.activeIndex
            // var currenSlide = swiper.slides[currentIndex]
            // const currentSlideMedia = currenSlide.firstElementChild
        //     const currentSlideMediaType = currentSlideMedia?.getAttribute('data-slide-type')

        //     // Handle cases when user click next before video ended
        //     if (isVideoPlaying.value) {
        //         console.log('Swiper: ', currentSlideMediaType)
        //     }

        //     switch (currentSlideMediaType) {
        //     case 'image':
        //         runNext()
        //         break
        //     case 'video':
        //         // player.currentTime(0)
        //         // player.play()
        //         console.log('Playing')
        //         isVideoPlaying.value = true
        //         break
        //     default:
        //         // throw new Error('invalid slide type')
        //     }
        //     // clearTimeout(videoSetting.value.timeout)
        // }

        onMounted(() => {
            console.log("Mounted Reels")
        })
        return {
            modules: [Mousewheel, Pagination],
            isVideoMuted,
            isVideoPlaying,
            onSlideChange,
            onSwiper,
            updateActiveSlideInstance,
            initializeSlideInstance,
            toggleVideoMute,
            playVideo,
            pauseVideo,
            updateVideoPlayingStatus,
            handleFollowRequest,
            isFollowed
        }
    },
    components: {
    NavBarMain,
    SwiperContainer: Swiper,
    SwiperSlide,
    SmallCard
}
})
</script>

<style>

.blur-filter {
    filter: blur(30px);
}

.transparent-black {
    background-color: rgba(0,0,0,.5);
}

.transparent-gray {
    background-color:rgba(134, 134, 134, 0.5);
}
/* .rounded-mute-border {
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
} */

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