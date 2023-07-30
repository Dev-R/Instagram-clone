<template>
    <div 
        class="flex flex-col space-x-2 justify-around 
        border-t border-gray-700 sticky bottom-0 md:hidden 
        z-50 bg-black">
        <div class="flex space-x-2 justify-around">

            <router-link
                to="home" 
                class="group cursor-pointer rounded-full 
                flex space-x-4 sm:hover:bg-slate-1000 sm:hover:delay-100
                p-3 xl:justify-start justify-center">
                <SVGLoader 
                    :icon="'home'" 
                    :class="'group-hover:scale-110'"/>
            </router-link>

            <router-link 
                to="explore"
                class="group cursor-pointer rounded-full 
                flex space-x-4 sm:hover:bg-slate-1000 sm:hover:delay-100
                    p-3 xl:justify-start justify-center">
                <SVGLoader 
                    :icon="'mobile-explore'" 
                    :class="'group-hover:scale-110'"/>
            </router-link>

            <router-link
                to="reels" 
                class="group cursor-pointer rounded-full 
                flex space-x-4 sm:hover:bg-slate-1000 
                sm:hover:delay-100 p-3 xl:justify-start 
                justify-center">
                <SVGLoader 
                    :icon="'reels'" 
                    :class="'group-hover:scale-110'"/>
            </router-link>


            <router-link
                to="direct" 
                class="group cursor-pointer rounded-full 
                flex space-x-4 sm:hover:bg-slate-1000 
                sm:hover:delay-100 p-3 xl:justify-start 
                justify-center">
                <SVGLoader 
                    :icon="'direct'" 
                    :class="'group-hover:scale-110'"/>
            </router-link>

            <router-link 
                to="profile"
                class="group cursor-pointer rounded-full 
                flex space-x-4 sm:hover:bg-slate-1000 sm:hover:delay-100 
                p-3 xl:justify-start justify-center">

                <img 
                class="w-6 h-6 rounded-full shadow-lg 
                group-hover:scale-110"
                src="https://i.ibb.co/JQVbxyH/img.jpg">
            </router-link >

        </div>
        <!-- <div class="h-8">
        </div> -->
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import SVGLoader from "@/components/basics/SVGLoader.vue"
export default defineComponent({
    name: 'BottomNavBar',
    setup() {
        onMounted(() => {
            // console.log('Mounted BottomNavBarMobile')
        })

        return {}
    },
    components: {
        SVGLoader
    }
})
</script>