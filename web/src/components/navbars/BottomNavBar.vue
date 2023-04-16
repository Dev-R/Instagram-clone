<template>
    <div 
        class="flex flex-col space-x-2 justify-around 
        border-t border-gray-700 sticky bottom-0 md:hidden 
        block z-50 bg-black">
        <div class="flex space-x-2 justify-around">

            <div 
            class="group cursor-pointer rounded-full 
            flex space-x-4 hover:bg-slate-1000 hover:delay-100 
            hover:delay-100 p-3 xl:justify-start justify-center">
            <SVGLoader 
                :icon="'home'" 
                :class="'group-hover:scale-110'"/>
            </div>

            <div 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 hover:delay-100
                    p-3 xl:justify-start justify-center">
                <SVGLoader 
                    :icon="'mobile-explore'" 
                    :class="'group-hover:scale-110'"/>
            </div>

            <div 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 
                hover:delay-100 p-3 xl:justify-start 
                justify-center">
                <SVGLoader 
                    :icon="'reels'" 
                    :class="'group-hover:scale-110'"/>
            </div>


            <div 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 
                hover:delay-100 p-3 xl:justify-start 
                justify-center">
                <SVGLoader 
                    :icon="'direct'" 
                    :class="'group-hover:scale-110'"/>
            </div>

            <div 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                p-3 xl:justify-start justify-center">

                <img 
                class="w-6 h-6 rounded-full shadow-lg 
                group-hover:scale-110"
                src="http://via.placeholder.com/26x26">
            </div>

        </div>
        <div class="h-8">
        </div>
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