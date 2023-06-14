<template>
    <div class="flex flex-col space-y-4 flex-nowrap sticky top-0">
        <!-- A -->
        <div 

            :class="{'xl:justify-start': !isNavBarCollapsed}"
            class="p-4 rounded-lg flex cursor-pointer justify-center">
            
            <!-- Large Icon -->
            <div
                v-if="!isNavBarCollapsed"
                class="xl:block hidden p-2 pt-7">
                <SVGLoader :icon="'instagram-large'"/>
            </div>
            <div 
                :class="isNavBarCollapsed ? 'block pt-5' : 'xl:hidden block'">
                <!-- Small Icon -->
                <SVGLoader :icon="'instagram-small'"/>
            </div>

        </div>
        <!-- Side NavBar Items Rendering -->
        <div class="p-1 md:pl-3 flex flex-col space-y-2">
            <template 
                v-for="item in menuItems">
                <router-link
                    @click="item.onClick"
                    :to="item.path"
                    :class="{'xl:justify-center': isNavBarCollapsed}"
                    class="group cursor-pointer rounded-full 
                    flex space-x-4 hover:bg-slate-1000 hover:delay-100 
                    p-3 xl:justify-start justify-center">
                    
                    <SVGLoader 
                        v-if="item.name != 'profile'"
                        :icon="item.iconName" 
                        :class="'group-hover:scale-110'"/>

                    <img 
                        v-else
                        :src="item.img" 
                        class="w-6 h-6 rounded-full shadow-lg group-hover:scale-110" />

                    <span 
                        :class="{'xl:hidden': isNavBarCollapsed}"
                        class="xl:block hidden font-sans text-md 
                        font-normal text-white">
                        {{ item.title }}
                    </span>
                </router-link>
            </template>
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
            <span 
            :class="isNavBarCollapsed ? 'xl:hidden block' : 'block'"
                class="font-sans text-md 
                font-normal text-white">
                    More
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SVGLoader from '@/components/basics/SVGLoader.vue'
import type { NavBarItem } from '@/common/models/navbar.model' 

export default defineComponent({
    name: 'NavBarMain',
    setup(prop, context) {
        // Services
        const router = useRouter()
        const route = useRoute()

        const menuItems: NavBarItem[] = [
            {
                title: 'Home',
                path: '/home',
                name: 'home',
                customClass: '',
                iconName: 'home',
                onClick: () => {},
            },
            {
                title: 'Search',
                path: '/',
                name: 'search',
                customClass: '',
                iconName: 'search',
                onClick: () => {},
            },
            {
                title: 'Explore',
                path: '/',
                name: 'explore',
                customClass: '',
                iconName: 'explore',
                onClick: () => {},
            },
            {
                title: 'Reels',
                path: '/reels',
                name: 'reels',
                customClass: '',
                iconName: 'reels',
                onClick: () => {},
            },
            {
                title: 'Messages',
                path: '/direct',
                name: 'direct',
                customClass: '',
                iconName: 'direct',
                onClick: () => {},
            },
            {
                title: 'Notifications',
                path: '/',
                name: 'notifications',
                customClass: '',
                iconName: 'notifications',
                onClick: () => {},
            },
            {
                title: 'Create',
                path: '/create',
                name: 'create',
                customClass: '',
                iconName: 'create',
                onClick: () => onCreate(),
            },
            {
                title: 'Profile',
                path: '/profile',
                name: 'profile',
                customClass: '',
                iconName: '',
                img: 'http://via.placeholder.com/26x26',
                onClick: () => {}
            }
        ]

        // Routes with collapsed sidenavbar
        const topNavBarHiddenRoutes = ['direct']

        // Methods

        // Computed
        const routeName = computed(()=> {
            return route.name ? route.name.toString() : ''
        })

        const isNavBarCollapsed = computed(() => {
            return topNavBarHiddenRoutes.includes(routeName.value)
        })

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
            topNavBarHiddenRoutes,
            menuItems,
            routeName,
            isNavBarCollapsed,
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