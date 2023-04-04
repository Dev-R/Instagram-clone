<template>
    <div 
        id="photo-modal"
        class="rounded-lg shadow overflow-hidden lg:pt-0 lg:z-0 z-50 
        lg:h-auto bg-slate-1100 absolute  lg:w-screen w-4/5 h-3/5 max-h-md sm:max-h-fit md:max-w-none max-w-md 
        top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2"
        :class="{ 
            'hidden': isToggled,
            'lg:max-w-[750px]' : nonEditStages.includes(currentModalStage),
            'lg:max-w-[1024px]' : editStages.includes(currentModalStage)
        }">
        <div class="rounded-full">
                <!-- Header -->
                <div 
                    class="flex border-b border-gray-700
                    justify-center md:p-3 p-2.5 hover:cursor-pointer"
                    :class="{
                        'justify-between' : isFileUploaded && isFileValid,
                        'justify-center' : !(isFileUploaded && isFileValid)
                    }">
                    <!-- 
                        TODO: Remove lazy solution, add css
                        v-if="isFileUploaded && isFileValid"> -->
                    <span
                        v-if="editStages.includes(currentModalStage)"
                        @click="updateModalStage(currentModalStage === 'edit-post-adjustments' ? 'create-post' : 'edit-post-adjustments')">
                        <SVGLoader
                        :icon="'media-back-arrow'"/>
                    </span>
                    <span v-else>
                    </span>
                    
                    <span class="font-sans md:text-md font-semibold text-white">
                        {{ modalHeaderName }}
                    </span>
                    <!-- 
                        TODO: Remove lazy solution, add css
                        v-if="isFileUploaded && isFileValid"> -->
                    <span 
                        v-if="isFileUploaded && isFileValid && currentModalStage === 'edit-post-adjustments'"
                        @click="updateModalStage('edit-post-comment')"
                        class="font-sans text-sm font-semibold text-sky-500 
                        justify-self-end cursor-pointer pt-1
                        hover:text-white">
                        Next
                    </span>
                    <span 
                        v-else-if="currentModalStage === 'edit-post-comment'"
                        @click="updateModalStage('sharing-post')"
                        class="font-sans text-sm font-semibold text-sky-500 
                        justify-self-end cursor-pointer pt-1
                        hover:text-white">
                        Share
                    </span>
                    <span v-else>
                    </span>
                </div>
                <div 
                    class="relative flex sm:flex-row 
                    flex-col lg:h-[750px]">
                    <!-- Body -->
                    <div 
                        class="flex relative grid sm:w-4/5 sm:p-0 grow lg:translate-y-0 sm:translate-y-1/2"
                        :class="{ 
                            'p-12': !previewImage,
                            }">


                            <!-- Upload Form -->
                            <div 
                                v-if="currentModalStage === 'create-post'"
                                class="flex flex-col place-self-center space-y-4">
                                <SVGLoader :icon="'media-modal'" :class="'mx-auto'"/>

                                <span class="font-sans lg:text-xl sm:text-lg text-md text-white md:font-semibold mx-auto">
                                    Drag photos and videos here
                                </span>
                                <button  
                                    @click="triggerFileUpload"
                                    type="button" 
                                    class="text-white bg-[#0095f6] hover:bg-sky-700
                                    font-semibold w-auto mx-auto rounded-lg text-sm 
                                    lg:px-3 lg:py-1.5 px-3 py-1.5 lg:w-auto">
                                    Select from computer
                                </button>

                                <input
                                    @change="onFileUploaded"
                                    ref="fileUpload"
                                    accept="image/*"
                                    type='file' hidden/>
                            </div>

                            <!-- Uploaded Image Preview -->
                            <img
                                v-else-if="previewImage && editStages.includes(currentModalStage)"
                                :src="previewImage"
                                :style="isFilterApplied ? { filter: `${ imageBrightness } ${ imageContrast } ${ imageSaturation }` } : undefined"
                                :class="[imageFilter]"
                                class="absolute block lg:h-full md:h-[585.6px] h-lg w-full -translate-x-1/2 
                                md:-translate-y-1/2 top-1/2 left-1/2"/>

                            <!-- Loading Progress -->
                            <div v-else-if="currentModalStage === 'sharing-post'">
                                <img
                                    src="https://static.cdninstagram.com/rsrc.php/v3/yY/r/uCPMn4bWLAh.gif"
                                    class="absolute block md:h-24 md:w-24 w-full -translate-x-1/2  
                                    md:-translate-y-1/2 top-1/2 left-1/2"/>
                            </div>
                            
                            <!-- Loading Completed Successfully -->
                            <div v-else-if="currentModalStage === 'post-shared'"
                                class="flex flex-col -translate-x-1/2 space-y-2
                                 absolute lg:-translate-y-1/2  translate-y-1/2 top-1/2 left-1/2">
                                <img
                                    id="theImage"
                                    src="https://static.cdninstagram.com/rsrc.php/v3/yD/r/ywSe_I8p9lm.gif"
                                    class="block md:h-24 md:w-24 self-center"/>
                                <span class="md:text-xl text-sm text-center font-normal  text-white">
                                    Your post has been shared.
                                </span>
                            </div> 
                    </div>
                    <div
                        class="md:block hidden">                                               
                        <div 
                            v-if="currentModalStage === 'edit-post-adjustments'"
                            class="flex justify-between border-b border-slate-500"
                            :class="modalHeaderName != 'Edit' ? 'hidden' : ''">

                            <div
                                @click="filterTabSwitcher('filters-tab')" 
                                class="basis-1/2 font-normal p-3
                                text-center text-sm hover:cursor-pointer 
                                border-b-2 border-gray-300"
                                :class="currentActiveFilterTab === 'filters-tab' ? 'text-white' : 'border-transparent text-gray-500'">
                                Filters
                            </div>

                            <div 
                                @click="filterTabSwitcher('adjustments-tab')" 
                                class="basis-1/2 font-normal p-3
                                text-center  text-sm 
                                hover:cursor-pointer
                                border-b-2 border-gray-300"
                                :class="currentActiveFilterTab === 'adjustments-tab' ? 'text-white' : 'border-transparent text-gray-500'">
                                Adjustments
                            </div>

                        </div>
                        <!-- Filters tab -->
                        <div
                            class="flex flex-wrap sm:pl-1.5 pt-3 
                            h-fit md:w-80 justify-around"
                            :class="{
                                'hidden': currentModalStage != 'edit-post-adjustments' || currentActiveFilterTab != 'filters-tab',
                                'invisible': currentActiveFilterTab != 'filters-tab'
                            }">
                            <!-- TODO: Optimize and convert into for loop- -->
                            <div 
                                @click="updatePreviewImageFitler('original', '')"
                                class="flex flex-col pt-2 lg:w-[88px] 
                                w-20 pb-3 hover:cursor-pointer 
                                active:scale-95 active:brightness-75">
                                <div
                                    :class="activePreviewImageFilter.filterName === 'original' ? 'border-2 border-sky-500 rounded' : ''">
                                    <img 
                                        src="https://i.ibb.co/m5p6wKJ/Normal.jpg" 
                                        class="w-fit rounded">
                                </div>
                                <span 
                                    class="font-sans text-center text-xs pt-1"
                                    :class="activePreviewImageFilter.filterName === 'original' ? 'text-sky-500' : 'text-gray-500'">
                                    Original
                                </span>
                            </div>

                            <div 
                                @click="updatePreviewImageFitler('slumber', 'saturate-50')"
                                class="flex flex-col pt-2 lg:w-[88px] 
                                w-20 hover:cursor-pointer 
                                active:scale-95 active:brightness-75">
                                <div
                                    :class="activePreviewImageFilter.filterName === 'slumber' ? 'border-2 border-sky-500 rounded' : ''">
                                    <img 
                                        src="https://i.ibb.co/m5p6wKJ/Normal.jpg" 
                                        class="w-fit rounded saturate-50">
                                </div>
                                <span 
                                    class="font-sans text-center text-xs text-sky-500 pt-1"
                                    :class="activePreviewImageFilter.filterName === 'slumber' ? 'text-sky-500' : 'text-gray-500'">
                                    Slumber
                                </span>
                            </div>

                            <div 
                                @click="updatePreviewImageFitler('moon', 'grayscale')"
                                class="flex flex-col pt-2 lg:w-[88px] 
                                w-20 hover:cursor-pointer 
                                active:scale-95 active:brightness-75">
                                <div
                                    :class="activePreviewImageFilter.filterName === 'moon' ? 'border-2 border-sky-500 rounded' : ''">
                                    <img 
                                        src="https://i.ibb.co/m5p6wKJ/Normal.jpg" 
                                        class="w-fit rounded grayscale">
                                </div>
                                <span 
                                    class="font-sans text-center text-xs text-sky-500 pt-1"
                                    :class="activePreviewImageFilter.filterName === 'moon' ? 'text-sky-500' : 'text-gray-500'">
                                    Moon
                                </span>
                            </div>

                            <div 
                                @click="updatePreviewImageFitler('sepia', 'sepia')"
                                class="flex flex-col pt-2 lg:w-[88px] 
                                w-20 hover:cursor-pointer 
                                active:scale-95 active:brightness-75">
                                <div
                                    :class="activePreviewImageFilter.filterName === 'sepia' ? 'border-2 border-sky-500 rounded' : ''">
                                    <img 
                                        src="https://i.ibb.co/m5p6wKJ/Normal.jpg" 
                                        class="w-fit rounded sepia">
                                </div>
                                <span 
                                    class="font-sans text-center text-xs text-sky-500 pt-1"
                                    :class="activePreviewImageFilter.filterName === 'sepia' ? 'text-sky-500' : 'text-gray-500'">
                                    Sepia
                                </span>
                            </div>
                            
                            <div 
                                @click="updatePreviewImageFitler('invert', 'invert')"
                                class="flex flex-col pt-2 lg:w-[88px] 
                                w-20 hover:cursor-pointer 
                                active:scale-95 active:brightness-75">
                                <div
                                    :class="activePreviewImageFilter.filterName === 'invert' ? 'border-2 border-sky-500 rounded' : ''">
                                    <img 
                                        src="https://i.ibb.co/m5p6wKJ/Normal.jpg" 
                                        class="w-fit rounded invert">      
                                </div>
                                <span 
                                    class="font-sans text-center text-xs text-sky-500 pt-1"
                                    :class="activePreviewImageFilter.filterName === 'invert' ? 'text-sky-500' : 'text-gray-500'">
                                    Invert 
                                </span>
                            </div>

                            <div 
                                @click="updatePreviewImageFitler('juno', 'contrast-150')"
                                class="flex flex-col pt-2 lg:w-[88px] 
                                w-20 hover:cursor-pointer 
                                active:scale-95 active:brightness-75">
                                <div
                                    :class="activePreviewImageFilter.filterName === 'juno' ? 'border-2 border-sky-500 rounded' : ''">
                                    <img 
                                        src="https://i.ibb.co/m5p6wKJ/Normal.jpg" 
                                        class="w-fit rounded contrast-150"
                                        :class="activePreviewImageFilter.filterName === 'juno' ? 'text-sky-500' : 'text-gray-500'">
                                </div>
                                <span 
                                    class="font-sans text-center text-xs text-sky-500 pt-1"
                                    :class="activePreviewImageFilter.filterName === 'juno' ? 'text-sky-500' : 'text-gray-500'">
                                    Juno
                                </span>
                            </div>


                        </div>
                        <!-- Adjustments tab -->
                        <div 
                            class="flex flex-col space-y-4 md:w-80"
                            :class="{
                                'hidden': currentModalStage != 'edit-post-adjustments' || currentActiveFilterTab != 'adjustments-tab',
                                // 'invisible': currentActiveFilterTab != 'filters-tab'
                            }">
                            <div class="p-3 py-2 space-y-5">
                                <label 
                                    class="block mb-2 text-md font-medium text-white">
                                    Brightness
                                </label>

                                <div class="flex justify-between">
                                    <input  
                                        type="range" 
                                        max="99"
                                        v-model="currentImageAdjustments.brightness"
                                        class="self-center lg:w-64 w-auto h-0.5 bg-gray-200 
                                        rounded-lg appearance-none cursor-pointer bg-white"/>

                                    <span class="text-xs font-medium text-white">
                                        {{ currentImageAdjustments.brightness === 'Normal'  ? 50 : currentImageAdjustments.brightness }}
                                    </span>

                                </div>

                            </div>

                            <div class="p-3 py-2 space-y-5">
                                <label 
                                    class="block mb-2 text-md font-medium text-white">
                                    Contrast
                                </label>

                                <div class="flex justify-between">
                                    <input  
                                        type="range" 
                                        max="99"
                                        v-model="currentImageAdjustments.contrast"
                                        class="self-center lg:w-64 w-auto h-0.5 bg-gray-200 
                                        rounded-lg appearance-none cursor-pointer bg-white"/>

                                    <span class="text-xs font-medium text-white">
                                        {{ currentImageAdjustments.contrast === 'Normal'  ? 50 : currentImageAdjustments.contrast }}
                                    </span>

                                </div>

                            </div>

                            <div class="p-3 py-2 space-y-5">
                                <label
                                    class="block mb-2 text-md font-medium text-white">
                                    Saturation
                                </label>

                                <div class="flex justify-between">
                                    <input  
                                        type="range" 
                                        max="99"
                                        v-model="currentImageAdjustments.saturation"
                                        class="self-center lg:w-64 w-auto h-0.5 bg-gray-200 
                                        rounded-lg appearance-none cursor-pointer bg-white"/>

                                    <span class="text-xs font-medium text-white">
                                        {{ currentImageAdjustments.saturation === 'Normal'  ? 50 : currentImageAdjustments.saturation }}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <!-- Last tab: Comments -->
                        <div 
                        
                            class="flex flex-col space-y-4 md:w-80 p-4"
                            :class="{
                                'hidden': currentModalStage != 'edit-post-comment' 
                                // 'invisible': currentActiveFilterTab != 'filters-tab'
                            }">
                            <!-- Mini User Profile -->
                            <div class="flex flex-inital flex-row text-center space-x-1">
                                <img 
                                    src="https://i.ibb.co/m5p6wKJ/Normal.jpg" 
                                    class="w-8 h-8 rounded-full">
                                
                                <div class="flex pl-1.5 pt-2 space-x-2">
                                    <span class="font-sans text-sm font-semibold text-white self-start">
                                         hot_souce_56
                                    </span>
                                    <span class="font-sans text-sm font-semibold text-white self-start">
                                        
                                    </span>
                                    <span class="font-sans text-xs text-sky-500 pt-1">
                                         
                                    </span>
                                </div>

                            </div>
                            <!-- Text Area -->
                            <div class="flex flex-col space-y-2">
                                <textarea 
                                    v-model="formRef.caption"
                                    rows="8"
                                    maxlength="2200"
                                    class="focus:outline-none resize-none 
                                    placeholder:text-[#636363]
                                    block w-full text-md bg-slate-1100 text-white"
                                    placeholder="Write a caption..."></textarea>
                                <div class="flex justify-between">
                                    <div class="text-[#636363]">
                                        <SVGLoader :icon="'profile-post-emoji'" />
                                    </div>
                                    <span class="text-[#636363] text-xs">
                                       {{ characterCount }}/2,200
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <div>
                                        <textarea 
                                            v-model="formRef.location"
                                            rows="1"
                                            maxlength="50"
                                            class="focus:outline-none resize-none 
                                            placeholder:text-[#636363]
                                            block w-full text-md bg-slate-1100 text-white"
                                            placeholder="Add location"></textarea>
                                    </div>
                                    <i class="fa-solid fa-location-dot fa-beat-fade text-white"></i>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
        </div>
        
    </div>
    <!-- Modal Header -->
    <div class="lg:block hidden pt-3">
        <div class="lg:mr-12 flex items-center justify-between cursor-pointer">
            <span class="ml-auto inline-flex text-white">
                <SVGLoader :icon="'cross'" @click="onModalClosed()" />
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue'

import SmallCard from '@/components/basics/smallCard.vue'
import SVGLoader from '@/components/basics/SVGLoader.vue'

type modalStages = 'create-post' | 'edit-post-adjustments' | 'edit-post-comment' | 'sharing-post' | 'post-shared' | 'post-failed'

export default defineComponent({
    name: "photoModal",
    setup(prop, context) {

        // References to DOM element
        const fileUpload = ref<InstanceType<typeof HTMLInputElement>>()
        const previewImage = ref<string | null>(null)
        const activePreviewImageFilter = ref({
            filterName: '',
            filterClass: '',
            filterValue: ''
        })
        const currentActiveFilterTab = ref('filters-tab')
        const currentModalStage = ref<modalStages>('create-post')

        const currentImageAdjustments = ref({
            brightness: 0 as number | string,
            contrast: 0 as number | string,
            saturation: 0 as number | string
        })

        const formRef = ref({
            caption: '',
            location: ''
        })

        // Stages tracking
        const editStages = ['edit-post-adjustments', 'edit-post-comment']
        const nonEditStages = ['create-post', 'sharing-post', 'post-shared', 'post-failed']


        // Flags for tracking upload status
        const isFileUploaded = ref<boolean>(false)
        const isFileValid = ref<boolean>(false)
        const isFilterApplied = ref<boolean>(false)


        const filterTabSwitcher = (currentTab: string) => {
            // resetImageAdjustments() // Remove manuel adjustments 
            console.log("Current Tab:", currentTab)
            currentActiveFilterTab.value = currentTab
        }
        /**
         * Emit signal when the modal is closed
         * @event modal-closed
         */
        const onModalClosed = () => {
            context.emit('onModalClosed')
        }

        /**
         * Trigger DOM file upload event
         */
        const triggerFileUpload = () => {
            fileUpload.value?.click()
        }


        /**
         * Go one set back
         */
        const onPreviousStep = () => {

        }

        /**
         * Go one set front
         */
        const onNextStep = () => {

        }


        /**
         * Update preview image filter
         */
        const updatePreviewImageFitler = (filterName: string, filterClass: string) => {
            activePreviewImageFilter.value.filterName = filterName
            activePreviewImageFilter.value.filterClass = filterClass
        }

        /**
         * Reset preview image to null
         */
        const clearPreviewImage = () => {
            previewImage.value = null
        }

        /**
         * Reset adjustments values
         */
        const resetImageAdjustments = () => {
            [
                currentImageAdjustments.value.brightness,
                currentImageAdjustments.value.saturation,
                currentImageAdjustments.value.contrast
            ] = [
                    'Normal',
                    'Normal',
                    'Normal'
                ]
        }

        const updateModalStage = (stage: modalStages) => {
            currentModalStage.value = stage
        }

        /**
         * TODO: Add validation
         * Handle file uploaded event
         * @param {Object} event - The event object
         */
        const onFileUploaded = (event: Event) => {
            const targetEvent = event.target as HTMLInputElement
            const file = targetEvent?.files?.item(0) as Blob

            // Read the file as data URL to show preview
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                previewImage.value = event.target?.result as string
            }
            isFileValid.value = true
            isFileUploaded.value = true
            updateModalStage('edit-post-adjustments')
            console.log("File uploaded", file)
        }

        // Watchers

        watch(currentModalStage, () => {
            if (currentModalStage.value === 'sharing-post') {
                console.log("updateSharingStatus ...")
                setTimeout(() => {
                    currentModalStage.value = 'post-shared'
                    console.log("Done")
                }, 5000)
            }
        })

        watch(currentImageAdjustments.value, () => {
            if (!isFilterApplied.value) {
                isFilterApplied.value = true
            }
        })

        watch(activePreviewImageFilter.value, () => {
            if (isFilterApplied.value) {
                isFilterApplied.value = false
            }
        })

        // Computed

        const characterCount = computed(() => {
            return formRef.value.caption ? formRef.value.caption.length : 0
        })

        const modalHeaderName = computed(() => {
            switch (currentModalStage.value) {
                case 'create-post':
                    return 'Create new post'
                case 'edit-post-adjustments':
                case 'edit-post-comment':
                    return 'Edit'
                case 'sharing-post':
                    return 'Sharing'
                case 'post-shared':
                    return 'Post Shared'
                default:
                    return {}
            }
        })

        const imageFilter = computed(() => {
            return activePreviewImageFilter.value.filterClass
        })

        const imageBrightness = computed(() => {
            const brightness = currentImageAdjustments.value.brightness

            return brightness ? `brightness(${brightness}%)` : ''
        })

        const imageContrast = computed(() => {
            const contrast = currentImageAdjustments.value.contrast

            return contrast ? `contrast(${contrast}%)` : ''
        })


        const imageSaturation = computed(() => {
            const saturate = currentImageAdjustments.value.saturation

            return saturate ? `saturate(${saturate}%)` : ''
        })


        onMounted(() => {
        })
        return {
            onModalClosed,
            triggerFileUpload,
            fileUpload,
            onFileUploaded,
            clearPreviewImage,
            isFileUploaded,
            isFileValid,
            previewImage,
            modalHeaderName,
            activePreviewImageFilter,
            updatePreviewImageFitler,
            filterTabSwitcher,
            currentActiveFilterTab,
            currentImageAdjustments,
            imageSaturation,
            imageContrast,
            imageBrightness,
            imageFilter,
            currentModalStage,
            updateModalStage,
            editStages,
            nonEditStages,
            formRef,
            characterCount,
            isFilterApplied
        }
    },
    props: {
        isToggled: {
            type: Boolean,
            required: true
        }
    },
    components: {
        SmallCard,
        SVGLoader
    },
    emits: [
        'onModalClosed',
    ]
})
</script>


<style>
#photo-modal {
    transition:250ms linear;
}

/* #theImage {
    filter: brightness(200%);
    filter: saturate(200%);
    filter: contrast(200%);
} */

</style>