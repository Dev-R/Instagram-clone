<template>
	<div class="relative">
		<!-- Carousel wrapper -->
		<div class="relative overflow-hidden rounded-lg md:min-h-[585px] min-h-[410px]">
			<div
				v-for="media in medias"
				:key="`carousel-image-${media.index}`"
				:id="`carousel-item-${media.index}`"
				class="duration-300 ease-in-out absolute 
                inset-0 transition-all transform"
				:class="{
					'translate-x-0 z-20': currentIndex === media.index,
					'-translate-x-full z-10': prevIndex === media.index,
					'translate-x-full z-10': nextIndex === media.index,
					hidden:
						nextIndex != media.index &&
						prevIndex != media.index &&
						currentIndex != media.index
				}">
				<span
					class="absolute text-2xl 
                    font-semibold  text-white -translate-x-1/2 
                    -translate-y-1/2 top-1/2 left-1/2 
                    sm:text-3xl dark:text-gray-800">
					{{ media.title }}
				</span>
                
				<img
                    v-if="media.type === 'image'"
					:src="media.mediaUrl"
					class="absolute block w-full -translate-x-1/2 
                    -translate-y-1/2 top-1/2 left-1/2"
					:alt="media.title"/>
                   
                <video
                    v-else
                    loop
                    @play="updatePaused($event)"
                    @pause="updatePaused($event)"
                    :muted="isVideoMuted"
					class="absolute block w-full -translate-x-1/2 
                    -translate-y-1/2 top-1/2 left-1/2"
					:alt="media.title">
                
                    <source 
                        :src="media.mediaUrl" 
                        type="video/mp4">
                    Your browser does not support the video tag.
                </video>

			</div>
		</div>
		<!-- Slider controls -->

        <!-- Previous Button -->
		<button
			id="data-carousel-prev"
			type="button"
			class="absolute top-0 left-0 z-30 
            flex items-center justify-center 
            h-full px-4 cursor-pointer group 
            focus:outline-none"
			@click="onPrevImage()">
			<span
                class="inline-flex items-center justify-center
                 w-8 h-8 rounded-full sm:w-10 sm:h-10 
                 group-focus:outline-none">
				<i class="pr-6 fa-solid fa-circle-chevron-left text-2xl text-gray-300"></i>

				<span class="hidden">
					Previous
				</span>
			</span>
		</button>

        <!-- Next Button -->
		<button
			id="data-carousel-next"
			type="button"
			class="absolute top-0 right-0 z-30 
            flex items-center justify-center
            h-full px-4 cursor-pointer group 
            focus:outline-none"
			@click="onNextImage()">
			<span
				class="inline-flex items-center justify-center
                 w-8 h-8 rounded-full sm:w-10 sm:h-10 
                 group-focus:outline-none">
				<i class="pl-6 fa-solid fa-circle-chevron-right text-2xl text-gray-300"></i>

				<span class="hidden">Next</span>
			</span>
		</button>

        <!-- Video controls -->

        <!-- Mute Button -->
		<button
			id="data-carousel-mute"
			type="button"
			class="absolute top-64 right-0 z-30 
            flex items-center justify-center
            h-full cursor-pointer group 
            focus:outline-none"
			@click="onMuteVideo()">
			<span
				class="inline-flex items-center justify-center
                 rounded-full sm:w-6 sm:h-6
                 group-focus:outline-none bg-gray-600">

				<i 
                    class="fa-solid
                    text-sm text-gray-300"
                    :class="{
                        'fa-volume-high' : !isVideoMuted,
                        'fa-volume-xmark' : isVideoMuted,
                    }">
                    </i>
			</span>
		</button>

        <!-- Play Button -->
		<button
			id="data-carousel-next"
			type="button"
			class="absolute top-0 right-1/2 left-1/2 z-30 
            flex items-center justify-center
            h-full cursor-pointer group 
            focus:outline-none"
			@click="onPlayVideo()">
			<span
				class="inline-flex items-center justify-center
                 rounded-full sm:w-12 sm:h-12
                 group-focus:outline-none">

				<i class="fa-solid fa-play text-6xl text-gray-300 play"></i>
			</span>
		</button>

        <!-- <button
        class="absolute w-16 h-16 rounded-full bg-blue-500 hover:bg-red-500 text-white">
        <i class="el-icon-video-play text-2xl"> </i>
        </button> -->

	</div>
    <!-- Image Slideshow -->

	<!-- <ul
		class="flex flex-row mt-4 place-content-center gap-x-5"
		name="image-display-list">
		<div
			v-for="image in images"
			:key="`display-image-${media.index}`"
			:id="`diplay-image-item-${media.index}`"
			@click="onResetImage(media.index)"
			@mouseover="onResetImage(media.index)"
			class="
            md:w-15 md:w-20 rounded 
            overflow-hidden outline outline-offset-1
            "
			:class="{
				'outline-blue-500': currentIndex === media.index
			}">
			<img class="max-w-full h-auto" :src="media.imageUrl"/>
		</div>
	</ul> -->

</template>



<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import type { PostMedia } from '@/common/models/Post.model'
export default defineComponent({
    name: 'ProductImagesCarousel',
    setup(props, context) {

        // Carousel handlers
        let currentIndex = ref<number>(0) // Store the current active item index
        let nextIndex = ref<number>(props.medias[0].index + 1) // Calculate the index of the next item
        let prevIndex = ref<number>(props.medias.length - 1) // Calculate the index of the previous item
        const autoNextTimeInterval = ref<number>(props.autoNextTimeInterval) // Store time interval between each auto next image switch
        const timeBeforeFirstCall = ref<number>(5000) // Wait 5 secs before executing autoNext method 

        // Video handlers
        const isVideoMuted = ref<boolean>(true) // Check if video is currently muted or not
        const isVideoPlaying = ref<boolean>(false) // Check if video is playing or not
        const currentVideoElement = ref<HTMLVideoElement | null>(null) // Store current playing video DOM element 


        /**
         * Recusrively switch image based on the given @param interval time
         * @param interval time interval between each recursive function call
         */
        const autoTimedNextImage = (interval: number = autoNextTimeInterval.value) => {
            onNextImage(); setTimeout(autoTimedNextImage, interval)
        }

        /**
         * Move to the next item in the carousel
         */
        const onNextImage = () => {
            if (currentIndex.value === props.medias.length - 1) {
                // If the current item is the last in the array, reset the index to the first item
                currentIndex.value = props.medias[0].index
                // Set the index of the next item to the one after the current item
                nextIndex.value = props.medias[currentIndex.value + 1].index
                // Set the index of the previous item to the last item in the array
                prevIndex.value = props.medias.length - 1
            } else {
                // Set the index of the current item to the next item in the array
                currentIndex.value = props.medias[currentIndex.value + 1].index
                // Set the index of the previous item to the one before the current item
                prevIndex.value = currentIndex.value - 1
                // Set the index of the next item to the one after the current item, or reset to the first item if it's the last in the array
                nextIndex.value = currentIndex.value + 1 > props.medias.length - 1 ? 0 : currentIndex.value + 1
            }
            onNext()
        }

        /**
         * Move to the previous item in the carousel
         */
        const onPrevImage = () => {
            if (currentIndex.value === 0) {
                // If the current item is the first in the array, reset the index to the last item
                currentIndex.value = props.medias[props.medias.length - 1].index
                // Set the index of the previous item to the second to last item in the array
                prevIndex.value = currentIndex.value - 1
                // Set the index of the next item to the first item in the array
                nextIndex.value = props.medias[0].index
            } else {
                // Decrement the index of the current item
                currentIndex.value -= 1
                // Set the index of the previous item to the one before the current item, or reset to the last item if it's the first in the array
                prevIndex.value = prevIndex.value === 0 ? props.medias.length - 1 : prevIndex.value - 1
                // Set the index of the next item to the one after the current item, or reset to the last item if it's the first in the array
                nextIndex.value = nextIndex.value === 0 ? props.medias.length - 1 : nextIndex.value - 1
            }
            onPrev()
        }

        /**
         * Reset carousel indexes 
         */
        const onResetImage = (currentSelectedImageIndex: number) => {
            // Set nextIndex to current clicked image next index: 
            nextIndex.value = currentSelectedImageIndex + 1 > props.medias.length - 1 ? 0 : currentSelectedImageIndex + 1
            // Set prevIndex to current clicked image previous index: 
            prevIndex.value = currentSelectedImageIndex === 0 ? props.medias.length - 1 : currentSelectedImageIndex - 1
            // Set currentIndex to the current selected image index
            currentIndex.value = currentSelectedImageIndex
            onReset()
        }

        /**
         * Mute/Unmute Video
         */
         const onMuteVideo = () => {
            isVideoMuted.value = !isVideoMuted.value
        }

        /**
         * Pauses the video
         */
         const onPauseVideo = () => {
            currentVideoElement.value?.pause
        }

        /**
         * Plays the video
         */
         const onPlayVideo = () => {
            console.log("updatePaused", currentVideoElement.value)
            currentVideoElement.value?.play
        }

        /**
         * Updates the `isVideoPlaying` property based on the current video state.
         *
         * @param event - The `play` or `pause` event.
         */
        const updatePaused = (event: Event) => {
            console.log("updatePaused")
            const target = event.target as HTMLVideoElement
            currentVideoElement.value = target
            isVideoPlaying.value = target.paused
        } 


        /**
         * A computed property that returns true if the video is playing.
         */
        const playing = computed(() => {
            return !isVideoPlaying.value;
        });

        /**
         * Emit on next signal to listener
         */
        const onNext = () => {
            context.emit('onNext')
        }

        /**
         * Emit on prev signal to listener
         */
        const onPrev = () => {
            context.emit('onPrev')
        }

        /**
         * Emit on reset signal to listener
         */
        const onReset = () => {
            context.emit('onReset')
        }

        onMounted(() => {
            if (autoNextTimeInterval.value != 0) setTimeout(autoTimedNextImage, timeBeforeFirstCall.value)
        })

        return { 
            onNextImage, 
            onPrevImage, 
            onResetImage, 
            onMuteVideo, 
            onPlayVideo,
            onPauseVideo,
            updatePaused,
            playing,
            currentIndex, 
            prevIndex, 
            nextIndex, 
            isVideoMuted,
        }
    },
    props: {
        medias: {
            type: Object as () => PostMedia[],
            required: true
        },
        autoNextTimeInterval: {
            type: Number,
            required: false,
            default: 0
        },
    },
    emits: [
        'onNext',
        'onPrev',
        'onReset'
    ]
})
</script>