<template>
    <div class="flex flex-col space-y-4 flex-nowrap sticky top-0">
        <!-- A -->
        <div 
            class="p-4 rounded-lg flex cursor-pointer 
            xl:justify-start justify-center">

            <!-- Large Icon -->
            <div class="xl:block hidden p-2 pt-7">
                <SVGLoader :icon="'instagram-large'"/>
            </div>
            <div class="xl:hidden block">
                <!-- Small Icon -->
                <SVGLoader :icon="'instagram-small'"/>
            </div>

        </div>
        <!-- B -->
        <div class="p-1 md:pl-3 flex flex-col space-y-2">

            <router-link
                to="home" 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000
                hover:delay-100 p-3 xl:justify-start justify-center">
                
                <SVGLoader 
                    :icon="'home'" 
                    :class="'group-hover:scale-110'"/>
                
                <span class="xl:block hidden font-sans text-md font-bold text-white">
                    Home
                </span>
                
            </router-link>

            <div 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 
                hover:delay-100 p-3 xl:justify-start 
                justify-center">

                <SVGLoader 
                    :icon="'search'" 
                    :class="'group-hover:scale-110'"/>

                <span class="xl:block hidden font-sans text-md font-normal text-white">
                    Search
                </span>

            </div>

            <div 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 hover:delay-100
                    p-3 xl:justify-start justify-center">

                <SVGLoader 
                    :icon="'explore'" 
                    :class="'group-hover:scale-110'"/>

                <span class="xl:block hidden font-sans text-md font-normal text-white">
                    Explore
                </span>

            </div>

            <div 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 
                hover:delay-100 p-3 xl:justify-start 
                justify-center">

                <SVGLoader 
                    :icon="'reels'" 
                    :class="'group-hover:scale-110'"/>

                <span class="xl:block hidden font-sans text-md font-normal text-white">
                    Reels
                </span>

            </div>

            <router-link
                to="direct" 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 
                hover:delay-100 p-3 xl:justify-start 
                justify-center">

                <SVGLoader 
                    :icon="'direct'" 
                    :class="'group-hover:scale-110'"/>

                <span class="xl:block hidden font-sans text-md font-normal text-white">
                    Messages
                </span>

            </router-link>

            <div 
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                p-3 xl:justify-start justify-center">

                <SVGLoader 
                    :icon="'notifications'" 
                    :class="'group-hover:scale-110'"/>

                <span class="xl:block hidden font-sans text-md font-normal text-white">
                    Notifications
                </span>

            </div>

            <div 
                @click="onCreate"
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                p-3 xl:justify-start justify-center">

                <SVGLoader 
                    :icon="'create'" 
                    :class="'group-hover:scale-110'"/>

                <span class="xl:block hidden font-sans text-md font-light text-white">
                    Create
                </span>

            </div>

            <router-link 
                to="profile"
                class="group cursor-pointer rounded-full 
                flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                p-3 xl:justify-start justify-center">

                <img src="http://via.placeholder.com/26x26" class="w-6 h-6 rounded-full shadow-lg group-hover:scale-110">
                <span class="xl:block hidden font-sans text-md font-light text-white">
                    Profile
                </span>
                
            </router-link>

        </div>
        <!-- Temp-solution -->
        <div class="pt-10 invisible">
            A
        </div>
        <!-- C -->
        <div 
            class="cursor-pointer pt-10 rounded-full 
            flex space-x-4 absolute inset-x-0 -bottom-80 md:p-5">
            <SVGLoader :icon="'more'"/>
            <span class="xl:block hidden font-sans text-md font-normal text-white">
                    More
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import SVGLoader from '@/components/basics/SVGLoader.vue';

export default defineComponent({
    name: 'NavBarMain',
    setup(prop, context) {
        // Services
        const router = useRouter()

        // Methods
        /**
         * Emit signal when the modal is closed
         */
         const onCreate = () => {
            context.emit('onCreate')
        }

        /**
         * Emit signal when the profile is clicked
         */
        const onProfileOpen = () => {
            context.emit('onProfileOpen')
            setTimeout(() => {
                router.push({ path: '/profile' })
            }, 1000)
        }

        onMounted(() => {
            // console.log('Mounted NavBarMain')
        })

        return {
            onProfileOpen,
            onCreate
        }
    },
    components: {
        SVGLoader
    },
    emits: [
        'onCreate',
        'onProfileOpen'
    ]
})
</script>