<template>
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
                    v-if="routeName != 'home'"
                    class='rotate-[270deg]'>
                    <SVGLoader 
                        @click="onPageBack"
                        :icon="'back-arrow'" 
                        :class="'group-hover:scale-110'"/>
                </span>
    
                <span v-else>
                    <SVGLoader 
                        
                        :icon="'instagram-large'" 
                        :class="'group-hover:scale-110'"/>
                </span>

            </div>

            
            <div 
                v-if="routeName === 'home'"
                class="flex space-x-0.5">

                <div 
                    class="group cursor-pointer rounded-full 
                    flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                    pt-3 xl:justify-start justify-center">
                    <SVGLoader 
                        :icon="'create'" 
                        :class="'group-hover:scale-110'"/>
                </div>

                <div 
                    class="group cursor-pointer rounded-full 
                    flex space-x-4 hover:bg-slate-1000 
                    hover:delay-100 p-3 xl:justify-start 
                    justify-center">
                    <SVGLoader 
                        :icon="'like'" 
                        :class="'group-hover:scale-110'"/>
                </div>

            </div>

            <div    
                v-else
                class="font-sans text-md font-bold 
                absolute top-1/2 left-1/2 transform 
                -translate-x-1/2 -translate-y-1/2 ml-12
                text-white">
                    More
            </div>
            

        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SVGLoader from '@/components/basics/SVGLoader.vue';

export default defineComponent({
    name: 'TopNavBar',
    setup() {
        // Services
        const route = useRoute()
        const router = useRouter()


         const onPageBack= () => {
            setTimeout(() => {
                router.push({ path: '/' })
            }, 1000)
        }

        // Computed
        const routeName = computed(()=> {
            return route.name
        })

        onMounted(() => {
            // console.log('Mounted NavBarMobile')
        })


        return {
            routeName,
            onPageBack
        }
    },
    components: {
        SVGLoader
    }
})
</script>