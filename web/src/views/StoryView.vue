<template>
    <div class="container max-w-full h-screen bg-[#1a1a1a] space-y-5 p-2">
        <Carousel3d 
            ref="carousel"
            :startIndex="0"
            :autoplay="false"
            :controls-visible="true"
            :height="870"
            :width="490"
            :space="800"
            :autoplay-timeout="2000"
            :inverse-scaling="1200" 
            :perspective="0"
            :clickable="false"
            @after-slide-change="onAfterSlideChange"
            :display="'5'">
            <Slide
                v-for="(reel, slideIndex) in reels"
                @click="onSlideJump(slideIndex)" 
                :index="slideIndex">
                <figure class="relative max-w transition-all duration-300">
                    <!-- Progress Bar -->
                    <figcaption 
                        v-if="currentSlideIndex === slideIndex"
                        class="absolute inset-x-3 
                        top-2 w-11/12 bg-gray-400 
                        rounded-full h-0.5">
                            <div 
                                class="bg-gray-200 h-0.5 
                                rounded-full" 
                                :style="{ 'width': progressBar + '%' }">
                            </div>
                    </figcaption>

                    <!-- Info Bar -->
                    <figcaption 
                        class="absolute py-2 
                        text-lg top-5 flex 
                        flex-nowrap w-auto">
                        <div class="p-1 rounded-full">
                            <span class="block bg-white rounded-full relative">
                                <img 
                                    class="w-8 h-8 rounded-full object-cover"
                                    :src="reel.profilePictureUrl"/>
                            </span>
                        </div>

                        <div class="text-sm text-white self-center space-x-1">
                            <span>
                                {{ reel.userName }}
                            </span>

                            <i class="fa-solid fa-circle-check">
                            </i>
                            
                            <span>
                                3h
                            </span>
                        </div>
                    </figcaption>
                    
                    <!-- TODO: Add Support For Media Options -->
                    <!-- <figcaption
                        v-if="reel.items[0]?.type === 'video'"  
                        class="absolute py-5 px-2 text-lg top-5 right-0 flex flex-nowrap w-auto space-x-4">
                        <i class="fa-solid fa-play text-md text-gray-300"></i>

                        <i 
                            class="fa-solid fa-play 
                            text-md text-gray-300"
                            :class="{
                                'fa-volume-high': !isVideoMuted,
                                'fa-volume-xmark': isVideoMuted,
                            }">
                        </i>
                        <SVGLoader :icon="'story-options'" />
                    </figcaption> -->

                    <!-- Image -->
                    <img
                        v-if="reel.items[0]?.type === 'image'" 
                        :src="reel.items[0]?.mediaUrl" 
                        class="rounded-lg" 
                        :alt="reel.items[0]?.title" />

                    <!-- TODO: Add Support For Video-->
                    <!-- <video
                        v-else @load="" 
                        @canplay="appendToVideoElements(reel.items[0].index, $event)" 
                        :muted="isVideoMuted" 
                        class="absolute block w-full" 
                        :alt="reel.items[0].title">
                        <source :src="reel.items[0].mediaUrl" type="video/mp4">
                        Your browser does not support the video tag.
                    </video> -->

                    <!-- Reel Form -->
                    <figcaption class="absolute inset-x-3 bottom-6 w-11/12 rounded-full h-11 flex space-x-3">
                        <input 
                            type="text" 
                            class="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-full
                            focus:border-blue-500 block w-full p-2.5" 
                            placeholder="John">
                        <SVGLoader :icon="'like'" :class="'self-center'"/>
                        <SVGLoader :icon="'direct'" :class="'self-center'"/> 
                    </figcaption>

                </figure>
            </Slide>
        </Carousel3d>
    </div>
</template>
<!-- 
    1- Make timer count for X seconds, then -> print (Next slide) ✔
        A- Convert current time progress into percentage ✔
        B- Make progress bar appear in current index only ✔
    2- Insteading of printing next slide, go to next slide
        A- Make watch that reset index, when reached end ✔
        B- Handle on jump situation

    -->
    <script lang="ts">
    import { onMounted, defineComponent, ref, watch, computed } from 'vue'
    
    // @ts-ignore
    import { Carousel3d, Slide } from 'vue3-carousel-3d'
    
    import MediaCarousel from '@/components/basics/MediaCarousel.vue'
    import SVGLoader from '@/components/basics/SVGLoader.vue'
    import CommentModal from '@/components/basics/CommentModal.vue'
    import type { PostMedia } from '@/common/models/post.model'
    
    
    export default defineComponent({
        name: "StoryView",
        setup() {
    
            // TO-DO: Fix story skip bug
            const mediasArraySampleB: PostMedia[] = [
                {
                    index: 0,
                    type: 'image',
                    mediaUrl:
                        "https://loremflickr.com/490/870/sky",
                    title: "Legendary A"
                },
                {
                    index: 1,
                    type: 'image',
                    mediaUrl:
                        "https://loremflickr.com/490/870/love",
                    title: "Legendary A"
                },
                {
                    index: 2,
                    type: 'image',
                    mediaUrl:
                        "https://loremflickr.com/490/870/cat",
                    title: "Legendary A"
                },
                {
                    index: 3,
                    type: 'image',
                    mediaUrl:
                        "https://loremflickr.com/490/870/dog",
                    title: "Legendary A"
                },
            ]
    
            const mediasArraySampleA: PostMedia[] = [
                {
                    index: 0,
                    type: 'image',
                    mediaUrl:
                        "https://loremflickr.com/490/870/car",
                    title: "Legendary A"
                },
                {
                    index: 1,
                    type: 'video',
                    mediaUrl:
                        "https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Metal_Wind_Chimes_at_Sunset_preview.mp4",
                    title: "Legendary B"
                },
            ]
    
            const reels = [{
                id: 1,
                userName: 'Noura',
                profilePictureUrl: 'https://loremflickr.com/32/32/woman',
                expiringAt: '',
                seen: false,
                items: mediasArraySampleA,
                mediaCount: mediasArraySampleA.length
            },
            {
                id: 2,
                userName: 'Rabee',
                profilePictureUrl: 'https://loremflickr.com/32/32/man',
                expiringAt: '',
                seen: false,
                items: mediasArraySampleB,
                mediaCount: mediasArraySampleA.length
            },
            ]
    
            // Constants, bad practice. TODO: Move constants into their own files
            const TIMER_VALUE = 10 // 10
            const PROGRESS_INITIAL_VALUE = 0
            const INITIAL_SLIDE_INDEX = 0
            const MAX_REELS_INDEX = reels.length - 1
    
            // Data
            const timerCount = ref(TIMER_VALUE)
            const progressCount = ref(PROGRESS_INITIAL_VALUE)
            const currentSlideIndex = ref(INITIAL_SLIDE_INDEX)
            const carousel = ref<InstanceType<typeof Carousel3d>>()
    
            // Checkers
            const isToggled = ref<boolean>(false)
            const isTimerEnabled = ref(false)

            // Methods 
            const toggleModel = () => {
                isToggled.value = !isToggled.value
            }
    
            const resetToInitialValues = () => {
                progressCount.value = 0
                timerCount.value = TIMER_VALUE
            }
    
            const startTimer = () => {
                setTimeout(() => {
                    timerCount.value--
                    progressCount.value++
                }, 1000)
            }
    
            const completeTimer = () => {
                if (isTimerEnabled.value) {
                    progressCount.value++
                    currentSlideIndex.value++
                }
            }
    
            // Watchers
            watch(isTimerEnabled, (timerEnabled: boolean) => {
                    if (timerEnabled) {
                        setTimeout(() => {
                            timerCount.value--
                            progressCount.value++
                        }, 1000)
                    }
                }
            )
    
            watch(currentSlideIndex, (newIndex: number) => {
                if (newIndex > MAX_REELS_INDEX) {
                    currentSlideIndex.value = 0
                    newIndex = 0
                }
                carousel.value.goSlide(newIndex)
            })
    
            watch(timerCount, (newTime: number) => {
                    if (newTime > 0 && isTimerEnabled.value) {
                        startTimer()
                    }
                    else{
                        completeTimer()
                    }
                },
                { immediate: true }
            )

            // Event Listeners
            const onSlideJump = (slideIndex: number) => {
                if(slideIndex != currentSlideIndex.value) {
                    carousel.value.goSlide(slideIndex)
                    currentSlideIndex.value = slideIndex
                    resetToInitialValues()
                }
            }
    
            // Computed Properties
            const progressBar = computed(() => {
                return progressCount.value < TIMER_VALUE
                    ? (progressCount.value / TIMER_VALUE) * 100
                    : 100
            })
    
            onMounted(() => {
                isTimerEnabled.value = true
            })
    
            return {
                isToggled,
                currentSlideIndex,
                reels,
                progressBar,
                carousel,
                TIMER_VALUE,
                toggleModel,
                onAfterSlideChange: resetToInitialValues,
                onSlideJump
            }
        },
        components: {
            MediaCarousel,
            SVGLoader,
            CommentModal,
            Carousel3d,
            Slide
        }
    })
    </script>


<style>
</style>