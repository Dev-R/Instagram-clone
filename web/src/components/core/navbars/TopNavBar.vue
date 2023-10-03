<template>
    <div
        class="flex flex-col space-x-2 justify-around 
        sticky top-0 md:hidden z-50 bg-black border-gray-800 
        border-t border-b">
        <div class="flex space-x-2 justify-between relative">

            <div 
                class="group cursor-pointer rounded-full 
                flex space-x-4 sm:hover:bg-slate-1000 sm:hover:delay-100 
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
                    flex space-x-4 sm:hover:bg-slate-1000 sm:hover:delay-100 
                    pt-3 xl:justify-start justify-center">
                    <SVGLoader 
                        :icon="'create'" 
                        :class="'group-hover:scale-110'" />
                </div>

                <router-link 
                    to="/notifications"
                    class="group cursor-pointer rounded-full 
                    flex space-x-4 sm:hover:bg-slate-1000 
                    sm:hover:delay-100 p-3 xl:justify-start 
                    justify-center">
                    <SVGLoader 
                        :icon="'like'" 
                        :class="'group-hover:scale-110'" />
                </router-link>

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
    <Transition>
        <div    
            v-show="isDropDownTriggered"
            class="absolute right-5 z-50 md:hidden bg-slate-1100 
            divide-y divide-gray-100 rounded-lg shadow w-24">

            <div class="flex flex-col pt-2 pb-2 text-sm text-gray-200 space-y-3">
                
                <div
                    @click="onToggle"
                    class="flex justify-evenly cursor-pointer">
                    <span>
                        Post
                    </span>

                    <SVGLoader 
                        :icon="'create-small'" 
                        :class="'group-hover:scale-100 self-end'"/>

                </div>
                
                <div
                    @click="unsupportedFeature"
                    class="flex justify-evenly">
                    <span>
                        Story
                    </span>

                    <SVGLoader 
                        :icon="'new-story-small'" 
                        :class="'group-hover:scale-100 self-end'"/>

                </div>
            </div>
        </div>    
    </Transition>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
    SVGLoader
} from '@/components'

import { 
    usePhotoStore 
} from '@/stores'
import { useToast } from 'vue-toastification'

// import type { 
//     NavBarItem 
// } from '@/common'

export default defineComponent({
    name: 'TopNavBar',
    setup(props, context) {

        // Checkers
        const isDropDownTriggered = ref<boolean>(false)

        const triggerDropDown = () => {
            isDropDownTriggered.value = !isDropDownTriggered.value
        }
        

        // Services
        const route = useRoute()
        const router = useRouter()
        const photoStore = usePhotoStore()
        const toast = useToast()

        /**
         * Change store state to open file upload dialog
         */
         const onToggle = () => {
            photoStore.isFileUploadDialogOpen = !photoStore.isFileUploadDialogOpen
        }

        const unsupportedFeature = () => {
            toast.warning('This feature is not supported yet')
        }

         const onPageBack= () => {
            // structuredclone
            const historyCount = structuredClone(window.history.length)

            setTimeout(() => {
                /**
                 * Cheap way to check if user is coming from another website
                 * Users arriving from another website have a value higher than 0
                 * We want to redirect them to the home page
                 * Otherwise, we want to go back to the previous page
                 * https://stackoverflow.com/questions/62358716/check-if-there-is-a-previous-page-in-vue-route
                 */
                if (historyCount > 0) {
                    router.push('/home')
                } else {
                    router.back()
                }
            }, 1000)
        }

        // Computed
        const routeName = computed(()=> {
            switch (route.name) {
                case 'profile':
                    return route.params.username ? route.params.username : route.name.toString()
                default:
                    return route.name ? route.name.toString() : ''
            }
        })

        onMounted(() => {
        })


        return {
            routeName,
            isDropDownTriggered,
            triggerDropDown,
            unsupportedFeature,
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