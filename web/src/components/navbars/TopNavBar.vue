<template>
    <div  v-if="!hiddenRoutes.includes(routeName)">
        <div
            class="flex flex-col space-x-2 justify-around 
            sticky top-0 md:hidden z-50 bg-black border-gray-800 
            border-t border-b">
            <div 
                class="flex space-x-2 justify-between relative">

                <div 
                    class="group cursor-pointer rounded-full 
                    flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                    p-3 xl:justify-start justify-center">

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
                        @click="triggerDropDown"
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
                        <span class="capitalize">
                            {{ routeName }}
                        </span>
                </div>
                

            </div>
        </div>
        <!-- Drop Down menu -->
        <div
            :class="{
                'hidden': !isDropDownTriggered
            }"
            class="absolute right-5 z-50 md:hidden bg-slate-1100 
            divide-y divide-gray-100 rounded-lg shadow w-24">

            <div 
                class="flex flex-col pt-2 pb-2 text-sm 
                text-gray-200 space-y-3">
                
                <div
                    @click="onToggle"
                    class="flex justify-evenly">
                    <span>
                        Post
                    </span>

                    <SVGLoader 
                        :icon="'create-small'" 
                        :class="'group-hover:scale-100 self-end'"/>

                </div>
                
                <router-link 
                    class="flex justify-evenly" 
                    to="create/story">
                    <span>
                        Story
                    </span>

                    <SVGLoader 
                        :icon="'new-story-small'" 
                        :class="'group-hover:scale-100 self-end'"/>

                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { usePhotoStore } from '@/stores';
import SVGLoader from '@/components/basics/SVGLoader.vue';

export default defineComponent({
    name: 'TopNavBar',
    setup(props, context) {

        // Checkers
        const isDropDownTriggered = ref<boolean>(false)
        // inVisible Routes
        const hiddenRoutes = ['explore', 'style', 'story']

        const triggerDropDown = () => {
            isDropDownTriggered.value = !isDropDownTriggered.value
        }
        

        // Services
        const route = useRoute()
        const router = useRouter()
        const photoStore = usePhotoStore()

        /**
         * Change store state to open file upload dialog
         */
         const onToggle = () => {
            photoStore.isFileUploadDialogOpen = true
        }

         const onPageBack= () => {
            setTimeout(() => {
                router.back()
            }, 1000)
        }

        // Computed
        const routeName = computed(()=> {
            return route.name ? route.name.toString() : ''
        })

        onMounted(() => {
            // console.log('Mounted NavBarMobile')
        })


        return {
            routeName,
            hiddenRoutes,
            isDropDownTriggered,
            triggerDropDown,
            onPageBack,
            onToggle
        }
    },
    components: {
        SVGLoader
    },
    emits: [
        'onToggle',
    ]
})
</script>