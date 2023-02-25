<template>
	<div class="relative">
		<!-- Carousel wrapper -->
		<div class="relative overflow-hidden rounded-lg md:min-h-[585px] min-h-[410px]">
			<div
				v-for="image in images"
				:key="`carousel-image-${image.index}`"
				:id="`carousel-item-${image.index}`"
				class="duration-300 ease-in-out absolute 
                inset-0 transition-all transform"
				:class="{
					'translate-x-0 z-20': currentIndex === image.index,
					'-translate-x-full z-10': prevIndex === image.index,
					'translate-x-full z-10': nextIndex === image.index,
					hidden:
						nextIndex != image.index &&
						prevIndex != image.index &&
						currentIndex != image.index
				}">
				<span
					class="absolute text-2xl 
                    font-semibold  text-white -translate-x-1/2 
                    -translate-y-1/2 top-1/2 left-1/2 
                    sm:text-3xl dark:text-gray-800">
					{{ image.title }}
				</span>

				<img
					:src="image.imageUrl"
					class="absolute block w-full -translate-x-1/2 
                    -translate-y-1/2 top-1/2 left-1/2"
					:alt="image.title"/>
			</div>
		</div>
		<!-- Slider controls -->
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
				<i class="pr-6 fa-solid fa-circle-chevron-left text-2xl text-white"></i>

				<span class="hidden">
					Previous
				</span>
			</span>
		</button>

		<button
			id="data-carousel-next"
			type="button"
			class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
			@click="onNextImage()">
			<span
				class="inline-flex items-center justify-center
                 w-8 h-8 rounded-full sm:w-10 sm:h-10 
                 group-focus:outline-none">
				<i class="pl-6 fa-solid fa-circle-chevron-right text-2xl text-white"></i>

				<span class="hidden">Next</span>
			</span>
		</button>
	</div>
    <!-- Image Slideshow -->
	<!-- <ul
		class="flex flex-row mt-4 place-content-center gap-x-5"
		name="image-display-list">
		<div
			v-for="image in images"
			:key="`display-image-${image.index}`"
			:id="`diplay-image-item-${image.index}`"
			@click="onResetImage(image.index)"
			@mouseover="onResetImage(image.index)"
			class="
            md:w-15 md:w-20 rounded 
            overflow-hidden outline outline-offset-1
            "
			:class="{
				'outline-blue-500': currentIndex === image.index
			}">
			<img class="max-w-full h-auto" :src="image.imageUrl"/>
		</div>
	</ul> -->
</template>



<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import type { PostImage } from '@/common/models/Post.model'
export default defineComponent({
    name: 'ProductImagesCarousel',
    setup(props, context) {
        // Carousel handlers
        let currentIndex = ref<number>(0) // Store the current active item index
        let nextIndex = ref<number>(props.images[0].index + 1) // Calculate the index of the next item
        let prevIndex = ref<number>(props.images.length - 1) // Calculate the index of the previous item
        const autoNextTimeInterval = ref<number>(props.autoNextTimeInterval) // Store time interval between each auto next image switch
        const timeBeforeFirstCall = ref<number>(5000) // Wait 5 secs before executing autoNext method 

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
            if (currentIndex.value === props.images.length - 1) {
                // If the current item is the last in the array, reset the index to the first item
                currentIndex.value = props.images[0].index
                // Set the index of the next item to the one after the current item
                nextIndex.value = props.images[currentIndex.value + 1].index
                // Set the index of the previous item to the last item in the array
                prevIndex.value = props.images.length - 1
            } else {
                // Set the index of the current item to the next item in the array
                currentIndex.value = props.images[currentIndex.value + 1].index
                // Set the index of the previous item to the one before the current item
                prevIndex.value = currentIndex.value - 1
                // Set the index of the next item to the one after the current item, or reset to the first item if it's the last in the array
                nextIndex.value = currentIndex.value + 1 > props.images.length - 1 ? 0 : currentIndex.value + 1
            }
            onNext()
        }

        /**
         * Move to the previous item in the carousel
         */
        const onPrevImage = () => {
            if (currentIndex.value === 0) {
                // If the current item is the first in the array, reset the index to the last item
                currentIndex.value = props.images[props.images.length - 1].index
                // Set the index of the previous item to the second to last item in the array
                prevIndex.value = currentIndex.value - 1
                // Set the index of the next item to the first item in the array
                nextIndex.value = props.images[0].index
            } else {
                // Decrement the index of the current item
                currentIndex.value -= 1
                // Set the index of the previous item to the one before the current item, or reset to the last item if it's the first in the array
                prevIndex.value = prevIndex.value === 0 ? props.images.length - 1 : prevIndex.value - 1
                // Set the index of the next item to the one after the current item, or reset to the last item if it's the first in the array
                nextIndex.value = nextIndex.value === 0 ? props.images.length - 1 : nextIndex.value - 1
            }
            onPrev()
        }

        /**
         * Reset carousel indexes 
         */
        const onResetImage = (currentSelectedImageIndex: number) => {
            // Set nextIndex to current clicked image next index: 
            nextIndex.value = currentSelectedImageIndex + 1 > props.images.length - 1 ? 0 : currentSelectedImageIndex + 1
            // Set prevIndex to current clicked image previous index: 
            prevIndex.value = currentSelectedImageIndex === 0 ? props.images.length - 1 : currentSelectedImageIndex - 1
            // Set currentIndex to the current selected image index
            currentIndex.value = currentSelectedImageIndex
            onReset()
        }

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

        return { onNextImage, onPrevImage, onResetImage, currentIndex, prevIndex, nextIndex }
    },
    props: {
        images: {
            type: Object as () => PostImage[],
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