<template>
    <div class="bg-[#121212]">
        <section 
            class="container max-w-full mx-auto text-center"
            :class="{ 'brightness-50 pointer-events-none': commentModal.isToggled || photoModal.isToggled }">
            <div class="grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div 
                    class="xl:col-span-2 col-span-1 bg-black 
                    md:block hidden space-y-12 h-screen 
                    sticky top-0 border-r border-gray-900">
                    
                    <!-- A -->
                    <NavBarMain
                        />
                    
                </div>

                <!-- Center: Messages -->
                <div 
                    class="lg:col-span-6 lg:col-start-5 lg:grid md:col-span-6 
                    md:col-start-4 md:mt-8
                    col-span-12 bg-gray-300 lg:max-h-[920px]">
                    <div class="flex flex-row h-full">
                        <div class="bg-black basis-1/2 lg:block hidden">
                            
                            <div class="flex bg-black border border-slate-800 p-5 lg:h-16 w-full space-x-2 justify-between items-center">
                                    <div>
                                    </div>
                                    
                                    <div class="flex">
                                        <div class="cursor-pointer font-sans text-sm font-bold text-white pt-1">
                                            Instagram User
                                        </div>

                                        <div class="flex space-x-4 cursor-pointer">
                                        </div>
                                    </div>

                                    <div class="flex cursor-pointer items-center">
                                        <SVGLoader :icon="'new-message'" />
                                    </div>
                            </div>


                            <!-- Chat rendering -->

                            <div class="flex flex-col lg:max-h-[850px] overflow-auto">

                                <div class="flex p-3 space-x-3 hover:bg-[#262626] w-full">
                                    <!-- Profile Image -->
                                    <img 
                                        src="https://loremflickr.com/1024/1080/cat"
                                        class="cursor-pointer h-14 w-14 rounded-full shadow-lg">


                                    <!-- Username / Chat / Date -->
                                    <div class="flex flex-col self-center space-y-2 pb-3">
                                        <span class="font-sans text-sm font-semibold text-white self-start">
                                            Instagram User
                                        </span>
                                        <div class="flex flex-row space-x-1">
                                                <span class="font-sans text-xs font-semibold text-gray-400">
                                                    Hello World ...
                                                </span>

                                                <div class="font-sans text-xs font-semibold text-gray-500">
                                                    •
                                                </div>

                                                <div class="font-sans font-semibold text-xs text-gray-500 justify-self-end">
                                                    1d
                                                </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex p-3 space-x-3 hover:bg-[#262626] w-full">
                                    <!-- Profile Image -->
                                    <img 
                                        src="https://loremflickr.com/1024/1080/love"
                                        class="cursor-pointer h-14 w-14 rounded-full shadow-lg">


                                    <!-- Username / Chat / Date -->
                                    <div class="flex flex-col self-center space-y-2 pb-3">
                                        <span class="font-sans text-sm font-semibold text-white self-start">
                                            Instagram User
                                        </span>
                                        <div class="flex flex-row space-x-1">
                                                <span class="font-sans text-xs font-semibold text-gray-400">
                                                    Hello World ...
                                                </span>

                                                <div class="font-sans text-xs font-semibold text-gray-500">
                                                    •
                                                </div>

                                                <div class="font-sans font-semibold text-xs text-gray-500 justify-self-end">
                                                    1d
                                                </div>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        </div>
                        <!-- Current Chat -->
                        <div class="relative bg-black lg:basis-9/12 w-full md:h-full h-screen">
                            
                            <div class="flex lg:h-16 md:pl-8 w-full space-x-2 justify-between items-center border-slate-700 border-b lg:visible invisible">
                                    <div class="flex space-x-2 items-center">
                                        <img 
                                        src="https://loremflickr.com/1024/1080/car"
                                        class="cursor-pointer h-6 w-6 rounded-full shadow-lg">

                                            
                                        <div class="cursor-pointer font-sans text-sm font-bold text-white pt-1">
                                            Instagram User
                                        </div>
                                    </div>

                                    <div class="flex space-x-4 cursor-pointer ">
                                        <SVGLoader :icon="'audio-call'" />
                                        <SVGLoader :icon="'video-call'" />
                                        <SVGLoader :icon="'chat-info'" />
                                        <div></div>
                                        <div></div>
                                    </div>
                             </div>
                                
                            <div class="flex flex-col h-5/6 lg:max-h-[850px] overflow-auto">
                                <div class="flex pt-5 space-x-2 justify-center">
                                    <span class="font-sans text-xs font-semibold text-gray-400">
                                        November 2, 2020 12:44 am
                                    </span>
                                </div>

                                <!-- Other -->
                                <div class="m-2 flex pt-5 space-x-2">
                                    <img 
                                        src="https://loremflickr.com/1024/1080/car"
                                        class="cursor-pointer h-6 w-6 rounded-full shadow-lg self-end">
                                    <div class="p-3 border border-[#1f1f1f] rounded-full text-white lg:text-sm text-xs">
                                            السلام عليكم
                                    </div>
                                </div>

                                <!-- Current User -->
                                <div class="flex pt-5 space-x-2 justify-end">
                                    <!-- <img 
                                        src="https://loremflickr.com/1024/1080/car"
                                        class="cursor-pointer h-6 w-6 rounded-full shadow-lg self-end"> -->
                                    <div class="m-2 p-3 border border-[#1f1f1f] bg-[#262626] rounded-full text-white lg:text-sm text-xs">
                                        وعليكم السلام ورحمة الله وبركاته
                                    </div>
                                </div>
                                

                            </div>


                            <!-- TODO: Improve input shape -->
                            <div class="md:absolute sticky inset-x-3 bottom-6 w-11/12 rounded-full h-11 flex space-x-3">
                                <div class="relative w-full">

                                    <SVGLoader :icon="'gallery'" :class="'cursor-pointer absolute inset-y-0 right-14 flex items-center  pointer-events-none'"/> 

                                    <SVGLoader :icon="'like'" :class="'cursor-pointer absolute inset-y-0 right-4 flex items-center  pointer-events-none'"/> 
                                    <input
                                        tabindex="1"
                                        type="text"
                                        class="z-50 bg-black border border-[#262626] text-gray-900 text-sm rounded-full focus:outline-none
                                        block w-full p-2.5" 
                                        placeholder="Message">
                                </div>
                                    
                            </div>

                        </div>
                    </div>
 
                </div>

            </div>
        </section>
        <!-- Modals -->

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

import PostCard from '@/components/basics/PostCard.vue'
import SVGLoader from '@/components/basics/SVGLoader.vue'
import NavBarMain from '@/components/navbars/NavBarMain.vue'



export default defineComponent({
    name: 'DirectView',
    setup(props, context) {


        const commentModal = ref({
            isToggled: false,
            postId: 0
        })

        const photoModal = ref({
            isToggled: false,
            currentStep: '',
            isFileValid: false
        })

        let windowWidth = ref(window.innerWidth) // Current window width

        // Services
        const router = useRouter()
        // const photoStore = usePhotoStore()


        return {
            commentModal,
            photoModal,
        }
    },
    components: {
        PostCard,
        SVGLoader,
        NavBarMain,
    },
    props: {}
})
</script>



<style>

</style>