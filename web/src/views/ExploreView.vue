<template>
    <div 
        class="rounded-lg shadow w-4/5 h-5/6 overflow-hidden md:pt-0 md:z-0 z-50 
        lg:h-auto md:w-[742px] bg-slate-1100 absolute 
        top-1/2 left-1/2 transform -translate-x-1/2 
        -translate-y-1/2"
        :class="{ 'hidden': isToggled }">

        
        <div class="space-y-6 rounded-full pb-2">
                <div class="relative flex flex-col md:h-[750px]">
                    <!-- Header -->
                    <div 
                        class="flex border-b border-gray-700 
                        justify-center lg:p-3 hover:cursor-pointer"
                        :class="{
                            'justify-between' : isFileUploaded && isFileValid,
                            'justify-center' : !(isFileUploaded && isFileValid)
                        }">
                        <span>
                            <SVGLoader
                            :icon="'media-back-arrow'"/>
                        </span>
                        <span class="font-sans text-md font-semibold text-white">
                            {{ modalHeaderName }}
                        </span>
                        <span 
                            class="font-sans text-sm font-semibold text-sky-500 
                            justify-self-end cursor-pointer pt-1
                            hover:text-white">
                            Next
                        </span>
                    </div>
                    <!-- Body -->
                    <div class="relative overflow-hidden h-screen grid">
                        <img
                            v-if="previewImage"
                            :src="previewImage"
                            class="absolute block w-full -translate-x-1/2 
                            -translate-y-1/2 top-1/2 left-1/2"/>
                        <div 
                            v-else
                            class="flex flex-col place-self-center space-y-4">
                            <SVGLoader :icon="'media-modal'" :class="'mx-auto'"/>

                            <span class="font-sans text-xl text-white font-semibold mx-auto">
                                Drag photos and videos here
                            </span>
                            <button  
                                @click="triggerFileUpload"
                                type="button" 
                                class="text-white bg-[#0095f6] hover:bg-sky-700
                                font-semibold w-auto mx-auto rounded-lg text-sm 
                                 md:px-3 md:py-1.5 px-3 py-1 md:w-auto">
                                Select from computer
                            </button>

                            <input
                                @change="onFileUploaded"
                                ref="fileUpload"
                                accept="image/*"
                                type='file' hidden/>
                                
                        </div>
                    </div>
                </div>
        </div>
        
    </div>
    <!-- Modal Header -->
    <div class="md:block hidden pt-3">
        <div class="md:mr-12 flex items-center justify-between cursor-pointer">
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

        // Flags for tracking upload status
        const isFileUploaded = ref<boolean>(false)
        const isFileValid = ref<boolean>(false)


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
            return previewImage.value ? 'Crop' : 'Create new post'
        })

        onMounted(() => {
        })
        return {
            onModalClosed,
            triggerFileUpload,
            fileUpload,
            onFileUploaded,
            isFileUploaded,
            isFileValid,
            previewImage,
            modalHeaderName
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