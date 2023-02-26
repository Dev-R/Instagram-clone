<template>
    <div class="bg-black">
        <section class="container max-w-full mx-auto text-center">
            <div class="pt-5 grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div 
                    class="xl:col-span-2 col-span-1 bg-black 
                    md:block hidden space-y-12 relative h-screen 
                    sticky top-0 border-r border-gray-900">

                    <!-- A -->
                    <div class="flex flex-col space-y-4 flex-nowrap sticky top-0">
                        <!-- A -->
                        <div 
                            class="p-4 rounded-lg flex cursor-pointer 
                            xl:justify-start justify-center">

                            <!-- Large Icon -->
                            <SVGLoader :icon="'instagram-large'"/>
                            <!-- Small Icon -->
                            <SVGLoader :icon="'instagram-small'"/>

                        </div>
                        <!-- B -->
                        <div class="p-1 flex flex-col space-y-2">

                            <div 
                                class="group cursor-pointer rounded-full 
                                flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                                hover:delay-100 p-3 xl:justify-start justify-center">
                                
                                <SVGLoader :icon="'home'"/>
                                <span class="xl:block hidden font-sans text-md font-bold text-white">
                                    Home
                                </span>
                                
                            </div>

                            <div 
                                class="group cursor-pointer rounded-full 
                                flex space-x-4 hover:bg-slate-1000 
                                hover:delay-100 p-3 xl:justify-start 
                                justify-center">

                                <SVGLoader :icon="'search'"/>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Search
                                </span>

                            </div>

                            <div 
                                class="group cursor-pointer rounded-full 
                                flex space-x-4 hover:bg-slate-1000 hover:delay-100
                                 p-3 xl:justify-start justify-center">

                                 <SVGLoader :icon="'explore'"/>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Explore
                                </span>

                            </div>

                            <div 
                                class="group cursor-pointer rounded-full 
                                flex space-x-4 hover:bg-slate-1000 
                                hover:delay-100 p-3 xl:justify-start 
                                justify-center">

                                <SVGLoader :icon="'reels'"/>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Reels
                                </span>

                            </div>

                            <div 
                                class="group cursor-pointer rounded-full 
                                flex space-x-4 hover:bg-slate-1000 
                                hover:delay-100 p-3 xl:justify-start 
                                justify-center">

                                <SVGLoader :icon="'direct'"/>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Messages
                                </span>

                            </div>

                            <div 
                                class="group cursor-pointer rounded-full 
                                flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                                p-3 xl:justify-start justify-center">

                                <SVGLoader :icon="'notifications'"/>
                                <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    Notifications
                                </span>

                            </div>

                            <div 
                                class="group cursor-pointer rounded-full 
                                flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                                p-3 xl:justify-start justify-center">

                                <SVGLoader :icon="'create'"/>
                                <span class="xl:block hidden font-sans text-md font-light text-white">
                                    Create
                                </span>

                            </div>

                            <div 
                                class="group cursor-pointer rounded-full 
                                flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                                p-3 xl:justify-start justify-center">

                                <img src="http://via.placeholder.com/26x26" class="w-6 h-6 rounded-full shadow-lg">
                                <span class="xl:block hidden font-sans text-md font-light text-white">
                                    Profile
                                </span>
                                
                            </div>

                        </div>
                        <!-- Temp-solution -->
                        <div class="pt-10 invisible">
                            A
                        </div>
                        <!-- C -->
                        <div 
                            class="cursor-pointer pt-10 rounded-full 
                            flex space-x-4 absolute inset-x-0 -bottom-80">
                            <SVGLoader :icon="'setting'"/>
                            <span class="xl:block hidden font-sans text-md font-normal text-white">
                                    More
                            </span>
                        </div>
                    </div>
                    
                </div>

                <!-- Center: Posts -->
                <div 
                    class="lg:col-span-6 lg:grid md:col-span-6 
                    md:col-start-4 md:mt-3 md:p-0 
                    col-span-12 bg-black p-2">
 
                    <div 
                        class="md:w-[470px] flex flex-col 
                        space-y-4 flex-nowrap lg:w-[470px] 
                        justify-self-end lg:mr-[64px]">

                        <!-- Stories -->
                        <div class="mb-6 flex snap-x space-x-2 justify-evenly">

                            <div class="w-[66px] h-[66px] flex flex-col items-center">

                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/cat">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    RabiRx
                                </span>

                            </div>
                            
                            <div class="w-[66px] h-[66px] flex flex-col items-center">
                                
                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/dog">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    Mohaed
                                </span>
                            </div>


                            <div class="w-[66px] h-[66px] flex flex-col items-center">
                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/car">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    Alex
                                </span>
                            </div>


                            <div class="w-[66px] h-[66px] flex flex-col items-center">
                                <div class="bg-gradient-to-tr from-yellow-400  to-pink-500 p-[0.20rem] rounded-full">
                                    <span class="block rounded-full">
                                        <img class="rounded-full" src="https://loremflickr.com/201/200/snow">
                                    </span>
                                </div>
                                <span class="text-white text-xs">
                                    iiSaloomz
                                </span>
                            </div>


                        </div>

                        <!-- Posters -->

                        <div class="flex flex-col space-y-8">

                            <div class="flex flex-col space-y-4 pt-2">

                                <!-- Header: username | daysSinceUpload | options-->
                                <div class="flex rounded-lg space-x--1 justify-between">
                                    <!-- 1 -->
                                    <div class="flex space-x-2">

                                        <img src="http://via.placeholder.com/32x32" class="cursor-pointer h-8 w-8 rounded-full shadow-lg">
                                        <div class="flex pt-1">
                                            <div class="cursor-pointer font-sans text-sm font-semibold text-white">
                                                imamomarsuleiman
                                                <i class="fa-solid fa-circle-check"></i>
                                            </div>
                                            
                                            <div class="text-gray-500 w-5 font-sans text-md font-semibold text-white">
                                                •
                                            </div>

                                            <div class="font-sans text-sm font-semibold text-gray-500">
                                                1d
                                            </div>
                                        </div>

                                    </div>

                                    <div class="cursor-pointer">
                                        <SVGLoader :icon="'more-options-svg'"/>
                                    </div>

                                </div>
                                <!-- 2 -->
                                <div class="md:max-h-[585px] p-1">
                                    <!-- <img src="https://loremflickr.com/1024/1280" class="rounded"> -->
                                    <PostMediaCarousel 
                                    :medias="mediasArray"/>
                                </div>
                                <!-- 3 -->
                                <div class="flex justify-between">

                                    <div class="flex space-x-4">

                                        <span class="cursor-pointer hover:scale-90">
                                            <SVGLoader :icon="'like'"/>
                                        </span>

                                        <span class="cursor-pointer hover:scale-90">
                                            <SVGLoader :icon="'comment'"/>
                                        </span>
                
                                        <span class="cursor-pointer hover:scale-90">
                                            <SVGLoader :icon="'share'"/>
                                        </span>
                                        
                                    </div>

                                    <div class="cursor-pointer hover:scale-90">
                                        <SVGLoader :icon="'save'"/>
                                    </div>

                                </div>

                                <!-- 4 -->
                                <div class="cursor-pointer font-sans text-sm font-semibold text-white self-start">
                                    23,489 likes
                                </div>

                                <!-- 5 -->
                                <div class="font-sans text-sm text-white flex-col">
                                    <!-- <span class="font-semibold">imamomarsuleiman</span> -->
                                    <p class="text-sm text-left indent-8 break-all ">
                                        Dispiceremque ob nouavit. Aptaveras perebamque conferebant et fugitivi muliebrique attrectareque, pro e tenueratqueerati</p>
                                </div>

                                <!-- 6 -->
                                <div class="grid grid-cols-12 border-b border-slate-800 p-2">
                                    <span class="col-span-10">
                                        <textarea  rows="1" class="focus:outline-none resize-none block w-full text-sm bg-black text-white" placeholder="Add a comment..."></textarea>
                                    </span>
                                    <span class="font-sans text-xs text-sky-500 justify-self-end cursor-pointer hover:text-white h-6">
                                            Post
                                    </span>
                                    <span class="text-gray-600 justify-self-end cursor-pointer fa-regular fa-face-smile w-3 h-3">
                                    </span>
                                </div>
                            </div>
                            
                            <div class="flex flex-col space-y-4 pt-2">

                                <!-- Header: username | daysSinceUpload | options-->
                                <div class="flex rounded-lg space-x--1 justify-between">
                                    <!-- 1 -->
                                    <div class="flex space-x-2">

                                        <img src="http://via.placeholder.com/32x32" class="cursor-pointer h-8 w-8 rounded-full shadow-lg">
                                        <div class="flex pt-1">
                                            <div class="cursor-pointer font-sans text-sm font-semibold text-white">
                                                imamomarsuleiman
                                                <i class="fa-solid fa-circle-check"></i>
                                            </div>
                                            
                                            <div class="text-gray-500 w-5 font-sans text-md font-semibold text-white">
                                                •
                                            </div>

                                            <div class="font-sans text-sm font-semibold text-gray-500">
                                                1d
                                            </div>
                                        </div>

                                    </div>

                                    <div class="cursor-pointer">
                                        <SVGLoader :icon="'more-options-svg'"/>
                                    </div>

                                </div>
                                <!-- 2 -->
                                <div class="md:max-h-[585px] p-1">
                                    <!-- <img src="https://loremflickr.com/1024/1280" class="rounded"> -->
                                    <PostMediaCarousel 
                                    :medias="mediasArray"/>
                                </div>
                                <!-- 3 -->
                                <div class="flex justify-between">

                                    <div class="flex space-x-4">

                                        <span class="cursor-pointer hover:scale-90">
                                            <SVGLoader :icon="'like'"/>
                                        </span>

                                        <span class="cursor-pointer hover:scale-90">
                                            <SVGLoader :icon="'comment'"/>
                                        </span>
                
                                        <span class="cursor-pointer hover:scale-90">
                                            <SVGLoader :icon="'share'"/>
                                        </span>
                                        
                                    </div>

                                    <div class="cursor-pointer hover:scale-90">
                                        <SVGLoader :icon="'save'"/>
                                    </div>

                                </div>

                                <!-- 4 -->
                                <div class="cursor-pointer font-sans text-sm font-semibold text-white self-start">
                                    23,489 likes
                                </div>

                                <!-- 5 -->
                                <div class="font-sans text-sm text-white flex-col">
                                    <!-- <span class="font-semibold">imamomarsuleiman</span> -->
                                    <p class="text-sm text-left indent-8 break-all ">
                                        Dispiceremque ob nouavit. Aptaveras perebamque conferebant et fugitivi muliebrique attrectareque, pro e tenueratqueerati</p>
                                </div>

                                <!-- 6 -->
                                <div class="grid grid-cols-12 border-b border-slate-800 p-2">
                                    <span class="col-span-10">
                                        <textarea  rows="1" class="focus:outline-none resize-none block w-full text-sm bg-black text-white" placeholder="Add a comment..."></textarea>
                                    </span>
                                    <span class="font-sans text-xs text-sky-500 justify-self-end cursor-pointer hover:text-white h-6">
                                            Post
                                    </span>
                                    <span class="text-gray-600 justify-self-end cursor-pointer fa-regular fa-face-smile w-3 h-3">
                                    </span>
                                </div>
                            </div>

                        </div>
                         
                    </div>
                    
                </div>

                <!-- Right bar: Suggestions -->
                <div 
                    class="col-span-4 bg-black md:mt-5
                    lg:block hidden w-80">

                    <div class="flex flex-col space-y-4 flex-nowrap top-0 w-80">
                        
                        <!-- A -->
                        <div class="rounded-lg flex items-center space-x-2">

                            <div class="flex-inital">
                                <img src="https://loremflickr.com/56/56" class="w-14 h-14 rounded-full">
                            </div>

                            <div class="flex-inital ">
                                <span class="font-sans text-sm font-semibold text-white">
                                    hot_souce_56
                                </span>
                            </div>
                            
                            <div class="flex-inital grow grid">
                                <span class="font-sans text-xs text-sky-500 justify-self-end">
                                    Switch
                                </span>
                            </div>

                        </div>

                        <!-- B.1 -->
                        <div class="rounded-lg flex items-center space-x-2">

                            <div class="flex-inital">
                                <span class="font-sans text-sm font-semibold text-gray-400">
                                    Suggestions for you
                                </span>
                            </div>
                            <div class="flex-inital grow grid">
                                <span class="font-sans text-xs text-white justify-self-end">
                                    See All
                                </span>
                            </div>

                        </div>

                        <!-- B.2 -->
                        <div class="flex flex-col">

                            <div class="rounded-lg flex items-center space-x-2 w-80 h-12">

                                <div class="flex-inital">
                                    <img src="https://loremflickr.com/32/32/cat" class="w-8 h-8 rounded-full">
                                </div>

                                <div class="flex flex-inital flex-col">

                                    <span class="font-sans text-sm font-semibold text-white self-start">
                                        CS50
                                    </span>
                                    <span class="font-sans text-xs font-semibold text-gray-400 self-start">
                                        Followed by brianyu28 + 2 more
                                    </span>

                                </div>

                                <div class="flex-inital grow grid">
                                    <span class="font-sans text-xs text-sky-500 justify-self-end">
                                        Follow
                                    </span>
                                </div>

                            </div>

                            <div class="rounded-lg flex items-center space-x-2 w-80 h-12">

                                <div class="flex-inital">
                                    <img src="https://loremflickr.com/32/32/dog" class="w-8 h-8 rounded-full">
                                </div>
                                
                                <div class="flex flex-inital flex-col">

                                    <span class="font-sans text-sm font-semibold text-white self-start">
                                        yasir.qadhi
                                    </span>
                                    <span class="font-sans text-xs font-semibold text-gray-400 self-start">
                                        Popular
                                    </span>
                                    
                                </div>

                                <div class="flex-inital grow grid">
                                    <span class="font-sans text-xs text-sky-500 justify-self-end">
                                        Follow
                                    </span>
                                </div>

                            </div>

                            <div class="rounded-lg flex items-center space-x-2 w-80 h-12">

                                <div class="flex-inital">
                                    <img src="https://loremflickr.com/32/32/cat" class="w-8 h-8 rounded-full">
                                </div>

                                <div class="flex flex-inital flex-col">
                                    <span class="font-sans text-sm font-semibold text-white self-start">
                                        drhaifaayounis
                                    </span>
                                    <span class="font-sans text-xs font-semibold text-gray-400 self-start">
                                        Followed by imamomarsuleiman
                                    </span>
                                </div>

                                <div class="flex-inital grow grid">
                                    <span class="font-sans text-xs text-sky-500 justify-self-end">
                                        Follow
                                    </span>
                                </div>

                            </div>
                            
                        </div>
                        <!-- C -->
                        <div class="flex list-disc space-x-4 font-sans text-xs font-semibold text-gray-500 self-start flex-wrap">
                            <li class="list-none">About</li>
                            <li>Help</li>
                            <li>Press</li>
                            <li>API</li>
                            <li>Jobs</li>
                            <li>Privacy</li>
                            <li>Terms</li>
                            <li>Locations</li>
                            <li>Language</li>
                        </div>

                        <!-- D -->
                        <div class="flex font-sans text-xs font-semibold text-gray-500 self-start">
                            <span>
                                © 2023 INSTAGRAM FROM META
                            </span>
                        </div>
                    </div>
                    
                </div>

            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import PostMediaCarousel from '@/components/basics/PostMediaCarousel.vue'
import type { PostMedia } from '@/common/models/Post.model'
import SVGLoader from "@/components/basics/SVGLoader.vue"
export default defineComponent({
    name: 'Home',
    setup() {
        onMounted(() => {
            // console.log('Mounted Home')
        })

        const mediasArray: PostMedia[] = [
        {
                index: 0,
                type: 'video',
                mediaUrl:
                "https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Metal_Wind_Chimes_at_Sunset_preview.mp4",
                title: "Legendary A"
            },
            {
                index: 1,
                type: 'video',
                mediaUrl:
                    "https://joy1.videvo.net/videvo_files/video/free/2014-12/large_watermarked/Metal_Wind_Chimes_at_Sunset_preview.mp4",
                title: "Legendary B"
            },
            {
                index: 2,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/car",
                title: "Legendary C"
            },
            {
                index: 3,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/bird",
                title: "Legendary D"
            },
            {
                index: 4,
                type: 'image',
                mediaUrl:
                    "https://loremflickr.com/1024/1280/family",
                title: "Legendary E"
            }
        ];


        return {
            mediasArray
        }
    },
    components: {
        PostMediaCarousel,
        SVGLoader
    }
})
</script>



<style>

</style>