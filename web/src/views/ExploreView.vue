<template>
    <!-- Photo-modal for screens > sm -->
    <div 
        id="photo-modal"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        rounded-lg shadow overflow-hidden bg-slate-1100 z-50 hidden md:block
        lg:h-auto lg:pt-0 lg:z-0 lg:w-screen w-4/5 h-3/5 max-h-md sm:max-h-fit
        md:max-w-none max-w-md"
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
                    <!-- TODO: OZ -->
                    <span
                        v-if="editStages.includes(currentModalStage)"
                        @click="updateModalStage(currentModalStage === 'edit-post-adjustments' ? 'create-post' : 'edit-post-adjustments')">
                        <SVGLoader
                            :icon="'media-back-arrow'"/>
                    </span>

                    <span v-else>
                    </span>
                    
                    <span class="font-sans md:text-md font-semibold text-white">
                        {{ largeModalHeaderName }}
                    </span>

                    <span 
                        v-if="isFileUploaded && isFileValid && currentModalStage === 'edit-post-adjustments'"
                        @click="updateModalStage('edit-post-form')"
                        class="font-sans text-sm font-semibold text-sky-500 
                        justify-self-end cursor-pointer pt-1
                        hover:text-white">
                        Next
                    </span>

                    <span 
                        v-else-if="currentModalStage === 'edit-post-form'"
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
                        class="flex relative grid grow sm:w-4/5 
                        sm:p-0 sm:translate-y-1/2 lg:translate-y-0"
                        :class="{ 
                            'p-12': !previewImage,
                            }">

                            <!-- Upload Form -->
                            <div 
                                v-if="currentModalStage === 'create-post'"
                                class="flex flex-col place-self-center space-y-4">

                                <SVGLoader 
                                    :icon="'media-modal'" 
                                    :class="'mx-auto'"/>

                                <span 
                                    class="font-sans lg:text-xl sm:text-lg text-md 
                                    text-white md:font-semibold mx-auto">
                                    Drag photos and videos here
                                </span>

                                <button  
                                    @click="triggerFileUpload"
                                    type="button" 
                                    class="w-auto mx-auto font-semibold text-sm 
                                    text-white bg-[#0095f6] hover:bg-sky-700 rounded-lg 
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
                                class="absolute block top-1/2 left-1/2 
                                -translate-x-1/2 md:-translate-y-1/2
                                lg:h-full md:h-[585.6px] h-lg w-full"/>

                            <!-- Loading Progress -->
                            <div 
                                v-else-if="currentModalStage === 'sharing-post'">
                                <img
                                    src="https://static.cdninstagram.com/rsrc.php/v3/yY/r/uCPMn4bWLAh.gif"
                                    class="absolute block md:h-24 md:w-24 w-full 
                                    -translate-x-1/2 md:-translate-y-1/2 top-1/2 left-1/2"/>
                            </div>
                            
                            <!-- Loading Completed Successfully -->
                            <div 
                                v-else-if="currentModalStage === 'post-shared'"
                                class="absolute top-1/2 left-1/2 -translate-x-1/2 
                                translate-y-1/2 lg:-translate-y-1/2 flex flex-col space-y-2">

                                <img
                                    id="theImage"
                                    src="https://static.cdninstagram.com/rsrc.php/v3/yD/r/ywSe_I8p9lm.gif"
                                    class="block md:h-24 md:w-24 self-center"/>

                                <span 
                                    class="md:text-xl text-sm text-center 
                                    font-normal  text-white">
                                    Your post has been shared.
                                </span>

                            </div> 
                    </div>

                    <div
                        class="md:block hidden">    

                        <div 
                            v-if="currentModalStage === 'edit-post-adjustments'"
                            class="flex justify-between border-b border-slate-500"
                            :class="largeModalHeaderName != 'Edit' ? 'hidden' : ''">

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

                        <!-- Filters Tab -->
                        <div
                            class="flex flex-wrap sm:pl-1.5 pt-3 
                            h-fit md:w-80 justify-around"
                            :class="{
                                'hidden': currentModalStage != 'edit-post-adjustments' || currentActiveFilterTab != 'filters-tab',
                                'invisible': currentActiveFilterTab != 'filters-tab'}">

                                <!-- Use v-for directive to loop through the filters array -->
                                <div
                                    v-for="filter in filters"
                                    :key="filter.filterName"
                                    @click="updatePreviewImageFitler(filter.filterName, filter.filterClass)"
                                    class="flex flex-col pt-2 lg:w-[88px] w-20 
                                    hover:cursor-pointer active:scale-95 
                                    active:brightness-75">

                                    <div
                                        :class="{
                                            'border-2 border-sky-500 rounded': activePreviewImageFilter.filterName === filter.filterName
                                        }">

                                        <img
                                            src="https://i.ibb.co/m5p6wKJ/Normal.jpg"
                                            class="w-fit rounded"
                                            :class="filter.filterClass"/>

                                    </div>

                                    <span
                                        class="font-sans text-center text-xs"
                                        :class="activePreviewImageFilter.filterName === filter.filterName ? 'text-sky-500' : 'text-gray-500'">

                                        {{ filter.displayName }}
                                        
                                    </span>

                                </div>

                        </div>
                    

                        <!-- Adjustments tab -->
                        <div 
                            class="flex flex-col space-y-4 md:w-80"
                            :class="{
                                'hidden': currentModalStage != 'edit-post-adjustments' || currentActiveFilterTab != 'adjustments-tab',
                            }">

                            <div
                                v-for="adjustment in adjustments" 
                                :key="adjustment.label" 
                                class="p-3 py-2 space-y-5">
                                
                                <label class="block mb-2 text-md font-medium text-white">
                                    {{ adjustment.label }}
                                </label>

                                <div 
                                    class="flex justify-between">
                                    
                                    <input
                                        type="range"
                                        max="99"
                                        v-model="adjustment.value"
                                        class="self-center lg:w-64 w-auto h-0.5 bg-gray-200 
                                        rounded-lg appearance-none cursor-pointer bg-white"/>

                                    <span class="text-xs font-medium text-white">
                                        {{ adjustment.value === 'Normal' ? 50 : adjustment.value }}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <!-- Last tab: Post Form -->
                        <div 
                            class="flex flex-col space-y-4 md:w-80 p-4"
                            :class="{
                                'hidden': currentModalStage != 'edit-post-form' 
                            }">

                            <!-- Mini User Profile -->
                            <div class="flex flex-inital flex-row text-center space-x-1">

                                <img 
                                    src="https://i.ibb.co/m5p6wKJ/Normal.jpg" 
                                    class="w-8 h-8 rounded-full"/>
                                
                                <div class="flex pl-1.5 pt-2 space-x-2">

                                    <span class="font-sans text-sm font-semibold text-white self-start">
                                         hot_souce_56
                                    </span>

                                    <span></span>
                                    
                                    <span></span>

                                </div>

                            </div>

                            <!-- Text Area -->
                            <div class="flex flex-col space-y-2">

                                <textarea 
                                    v-model="formRef.caption"
                                    rows="8"
                                    maxlength="2200"
                                    class="block w-full text-md bg-slate-1100 
                                    text-white focus:outline-none 
                                    resize-none placeholder:text-gray-1100"
                                    placeholder="Write a caption..."/>

                                <div class="flex justify-between">

                                    <div class="text-gray-1100">
                                        <SVGLoader 
                                            :icon="'profile-post-emoji'"/>
                                    </div>

                                    <span class="text-gray-1100 text-xs">
                                       {{ characterCount }}/2,200
                                    </span>

                                </div>

                                <div class="flex justify-between">

                                    <textarea 
                                        v-model="formRef.location"
                                        rows="1"
                                        maxlength="50"
                                        class="block w-full text-md bg-slate-1100 
                                        text-white focus:outline-none resize-none 
                                        placeholder:text-gray-1100"
                                        placeholder="Add location"/>
                
                                    <i class="fa-solid fa-location-dot fa-beat-fade text-white"></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
        </div>
        
    </div>
    <!-- Photo-modal for mobile apps -->
    <div id="photo-modal" class="relative h-screen block sm:hidden">

        <!-- Header -->
        <div 
            class="flex flex-col space-x-2 justify-around 
            border-t border-gray-700 sticky top-0 md:hidden 
            block z-50 bg-black border-gray-800 border-t border-b">

            <div 
                class="flex space-x-2 justify-between relative">

                <div 
                    class="group cursor-pointer rounded-full 
                    flex space-x-4 hover:bg-slate-1000 hover:delay-100
                    hover:delay-100 p-3 xl:justify-start justify-center">

                    <span 
                        class="rotate-[270deg]"
                        :class="{'hidden': currentModalStage != 'create-post'}">
                        <SVGLoader 
                            :icon="'cross-large'"
                            :class="'group-hover:scale-110'"/>
                    </span>

                    <span 
                        @click="updateModalStage('create-post')"
                        class="rotate-[270deg]"
                        :class="{
                            'hidden': currentModalStage === 'create-post',
                            'invisible': currentModalStage === 'sharing-post'}">
                        <SVGLoader 
                            :icon="'back-arrow'"
                            :class="'group-hover:scale-110'"/>
                    </span>

                </div>

                <div 
                    class="flex px-2">

                    <span 
                        @click="updateModalStage(currentModalStage === 'create-post' ? 'edit-post-form' : 'sharing-post')"
                        class="font-sans text-md font-semibold text-sky-500 
                        group cursor-pointer flex space-x-4 pt-3 xl:justify-start
                        justify-center justify-self-end cursor-pointer 
                        pt-1 hover:delay-100 hover:text-white"
                        :class="{'invisible': currentModalStage === 'sharing-post'}">

                        {{ currentModalStage === 'create-post' ? 'Next' : 'Share' }}
                    </span>
                    
                </div>

                <div    
                    class="font-sans text-md font-semibold 
                    absolute top-1/2 left-1/2 transform 
                    -translate-x-1/2 -translate-y-1/2 ml-12
                    text-white">
                        {{ smallModalHeaderName }}
                </div>
                
            </div>

        </div>

        <!-- Preview & Filters -->
        <div
            :class="{'hidden' : currentModalStage != 'create-post'}"
            class="flex flex-col h-5/6">

            <!-- Image Preview -->
            <img
                src="https://loremflickr.com/1024/1080/cat"
                :style="isFilterApplied ? { filter: `${ imageBrightness } ${ imageContrast } ${ imageSaturation }` } : undefined"
                :class="[imageFilter]"
                class="basis-2/4"/>

            <!-- Filters Tab -->
            <div class="p-5 flex flex-row overflow-x-auto space-x-2 pt-2">

                <div
                    v-for="filter in filters"
                    :key="filter.filterName"
                    @click="updatePreviewImageFitler(filter.filterName, filter.filterClass)"
                    class="flex flex-col space-y-2 flex-none 
                    active:scale-95 active:brightness-75">

                    <span
                        class="font-sans text-center text-xs pt-1"
                        :class="activePreviewImageFilter.filterName === filter.filterName ? 'text-sky-500' : 'text-gray-500'">

                        {{ filter.displayName }}
                        
                    </span>
                    
                    <div>
                        <img 
                            src="https://i.ibb.co/m5p6wKJ/Normal.jpg" 
                            :class="filter.filterClass"
                            class="w-24 h-24 rounded-full rounded"/>
                    </div>

                </div>

            </div>

        </div>

        <!-- Post Form -->
        <div
            :class="{
                'hidden' : currentModalStage === 'create-post',
                'brightness-50' : currentModalStage === 'sharing-post'
            }"
            class="flex flex-col h-5/6 bg-slate-1000 space-y-4">

            <div class="flex space-x-2 py-5 px-2 bg-black">

                <img 
                    :src="'https://loremflickr.com/1024/1080/dog'"
                    class="rounded-full h-8 w-8"/>

                <textarea 
                    v-model="formRef.caption"
                    :disabled="currentModalStage === 'sharing-post'"
                    rows="2"
                    maxlength="2200"
                    class="focus:outline-none resize-none 
                    placeholder:text-gray-1100
                    block w-full text-xs bg-black text-white"/>

                <img 
                    :src="'https://loremflickr.com/1024/1080/dog'"
                    class="h-12 w-12"/>

            </div>

            <div class="flex justify-between bg-black">

                <textarea 
                    v-model="formRef.location"
                    :disabled="currentModalStage === 'sharing-post'"
                    rows="1"
                    maxlength="50"
                    class="focus:outline-none resize-none 
                    placeholder:text-white px-4 py-3 border-t-2 border-b-2 border-gray-800 
                    block w-full text-md bg-black text-white"
                    placeholder="Add location"/>

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
import { useRouter } from 'vue-router'

type modalStages = 'create-post' | 'edit-post-adjustments' | 'edit-post-form' | 'sharing-post' | 'post-shared' | 'post-failed'

/**
 * TODO:
 *  1- Create mobile view editor ✔
 *  2- Fix mobile nav-bar location ✔
 *  3- Optmize Code,  Remove lazy solution, add css
 *  4- Create TS models
 *  5- Factorize code
 */

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

        // Trackers
        const currentActiveFilterTab = ref('filters-tab')
        const currentModalStage = ref<modalStages>('create-post')
        const editStages = ['edit-post-adjustments', 'edit-post-form']
        const nonEditStages = ['create-post', 'sharing-post', 'post-shared', 'post-failed']

        // Flags for tracking upload status
        const isFileUploaded = ref<boolean>(false)
        const isFileValid = ref<boolean>(false)
        const isFilterApplied = ref<boolean>(false)

        // Others
        const currentImageAdjustments = ref({
            brightness: 0 as number | string,
            contrast: 0 as number | string,
            saturation: 0 as number | string
        })

        const adjustments = ref([
            { label: 'Brightness', value: currentImageAdjustments.value.brightness },
            { label: 'Contrast', value: currentImageAdjustments.value.contrast },
            { label: 'Saturation', value: currentImageAdjustments.value.saturation }
            // Add more filters here
        ])

        const formRef = ref({
            caption: '',
            location: ''
        })

        const filters = [
            { filterName: 'original', filterClass: '', displayName: 'Original' },
            { filterName: 'slumber', filterClass: 'saturate-50', displayName: 'Slumber' },
            { filterName: 'moon', filterClass: 'grayscale', displayName: 'Moon' },
            { filterName: 'sepia', filterClass: 'sepia', displayName: 'Sepia' },
            { filterName: 'invert', filterClass: 'invert', displayName: 'Invert' },
            { filterName: 'juno', filterClass: 'contrast-150', displayName: 'Juno' },
            // Add more filters here
        ]

        // Services
        const router = useRouter()


        // Methods
        /**
         * Emit signal when the modal is closed
         * @event modal-closed
         */
        const onModalClosed = () => {
            context.emit('onModalClosed')
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
         * Trigger DOM file upload event
         */
        const triggerFileUpload = () => {
            fileUpload.value?.click()
        }

        const filterTabSwitcher = (currentTab: string) => {
            console.log("Current Tab:", currentTab)
            currentActiveFilterTab.value = currentTab
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
                    router.push({ path: '/' })
                    // currentModalStage.value = 'post-shared'
                    // console.log("Done")
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

        const largeModalHeaderName = computed(() => {
            switch (currentModalStage.value) {
                case 'create-post':
                    return 'Create new post'
                case 'edit-post-adjustments':
                case 'edit-post-form':
                    return 'Edit'
                case 'sharing-post':
                    return 'Sharing'
                case 'post-shared':
                    return 'Post Shared'
                default:
                    return {}
            }
        })

        const smallModalHeaderName = computed(() => {
            switch (currentModalStage.value) {
                case 'create-post':
                    return 'New Photo Post'
                case 'edit-post-form':
                    return 'New post'
                case 'sharing-post':
                    return 'Sharing...'
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
            // Variables
            currentActiveFilterTab,
            currentImageAdjustments,
            currentModalStage,
            isFileUploaded,
            isFileValid,
            isFilterApplied,
            previewImage,
            activePreviewImageFilter,
            formRef,
            fileUpload,
            nonEditStages,
            editStages,
            filters,
            adjustments,

            // Computed
            imageSaturation,
            imageContrast,
            imageBrightness,
            imageFilter,
            largeModalHeaderName,
            smallModalHeaderName,
            characterCount,

            // Methods
            onModalClosed,
            triggerFileUpload,
            updatePreviewImageFitler,
            filterTabSwitcher,
            onFileUploaded,
            clearPreviewImage,
            updateModalStage,
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