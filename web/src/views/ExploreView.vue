<template>
    <div 
        id="photo-modal"
        class="rounded-lg shadow overflow-hidden lg:pt-0 lg:z-0 z-50 
        lg:h-auto bg-slate-1100 absolute  lg:w-screen w-4/5 h-3/5 max-h-[348px] sm:max-h-fit
        top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2"
        :class="{ 
            'hidden': isToggled,
            'lg:max-w-[1024px]' : modalHeaderName != 'Create new post',
            'lg:max-w-[750px]' : modalHeaderName === 'Create new post'
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
                        v-if="isFileUploaded && isFileValid">
                        <SVGLoader
                        @click="clearPreviewImage"
                        :icon="'media-back-arrow'"/>
                    </span>
                    
                    <span class="font-sans md:text-md font-semibold text-white">
                        {{ modalHeaderName }}
                    </span>
                    <!-- 
                        TODO: Remove lazy solution, add css
                        v-if="isFileUploaded && isFileValid"> -->
                    <span 
                        v-if="isFileUploaded && isFileValid"
                        class="font-sans text-sm font-semibold text-sky-500 
                        justify-self-end cursor-pointer pt-1
                        hover:text-white">
                        Next
                    </span>
                </div>
                <div 
                    class="relative flex sm:flex-row 
                    flex-col lg:h-[750px]">
                    <!-- Body -->
                    <div 
                        class="flex relative grid sm:w-4/5 sm:p-0 grow"
                        :class="{ 
                            'p-12': !previewImage,
                            }">
                        <img
                                v-if="previewImage"
                                :src="previewImage"
                                :class="activePreviewImageFilter.filterClass"
                                class="absolute block md:h-full w-full -translate-x-1/2  
                                md:-translate-y-1/2 top-1/2 left-1/2"/>
                            <div 
                                v-else
                                class="flex flex-col place-self-center space-y-4">
                                <SVGLoader :icon="'media-modal'" :class="'mx-auto'"/>

                                <span class="font-sans lg:text-xl text-lg text-white md:font-semibold mx-auto">
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
                    </div>
                    <div
                        class="md:block hidden">
                        <div 
                            class="flex  justify-between border-b border-slate-500"
                            :class="modalHeaderName === 'Create new post' ? 'hidden' : ''">

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
                        <div
                            class="flex flex-wrap sm:pl-1.5 pt-3 
                            h-fit md:w-80 justify-around"
                            :class="{
                                'hidden': modalHeaderName === 'Create new post',
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
import { defineComponent, onMounted, ref, computed } from 'vue';

import SmallCard from '@/components/basics/smallCard.vue';
import SVGLoader from '@/components/basics/SVGLoader.vue';

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

        // Flags for tracking upload status
        const isFileUploaded = ref<boolean>(false)
        const isFileValid = ref<boolean>(false)


        const filterTabSwitcher = (currentTab: string) => {
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
            console.log("File uploaded", file)
        }
        
        // Computed

        const modalHeaderName = computed(() => {
            return previewImage.value ? 'Edit' : 'Create new post'
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
            currentActiveFilterTab
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
</style>