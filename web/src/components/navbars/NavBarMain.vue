<template>
    <div class="flex flex-col space-y-4 flex-nowrap sticky top-0">
        <!-- A -->
        <div 
            class="p-4 rounded-lg flex cursor-pointer 
            xl:justify-start justify-center">

            <!-- Large Icon -->
            <div class="hidden md:block">
                <SVGLoader :icon="'instagram-large'"/>
            </div>
            <div class="block md:hidden">
                <!-- Small Icon -->
                <SVGLoader :icon="'instagram-small'"/>
            </div>

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
            <SVGLoader :icon="'more'"/>
            <span class="xl:block hidden font-sans text-md font-normal text-white">
                    More
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import SVGLoader from "@/components/basics/SVGLoader.vue"
export default defineComponent({
    name: 'NavBarMain',
    setup() {
        onMounted(() => {
            // console.log('Mounted NavBarMain')
        })

        return {}
    },
    components: {
        SVGLoader
    }
})
</script>