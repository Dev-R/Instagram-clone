<template>
    <div 
        class="flex flex-col space-x-2 justify-around 
        border-t border-gray-700 sticky bottom-0 md:hidden 
        z-50 bg-black">
        <div class="flex space-x-2 justify-around">

            <router-link
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path"
                class="group cursor-pointer rounded-full 
                flex space-x-4 sm:hover:bg-slate-1000 sm:hover:delay-100
                p-3 xl:justify-start justify-center">

                <img 
                    v-if="item.img"
                    class="w-6 h-6 rounded-full shadow-lg 
                    group-hover:scale-110"
                    :src="item.img" />

                <SVGLoader 
                    v-else-if="item.iconSvgName"
                    :icon="item.iconSvgName" 
                    :class="'group-hover:scale-110'" />

            </router-link>

        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent 
} from 'vue'

import {
    SVGLoader
} from '@/components'

import type { 
    NavBarItem 
} from '@/common'

export default defineComponent({
    name: 'BottomNavBar',
    setup() {

        const menuItems: NavBarItem[] = [
            {
                title: 'Home',
                path: 'home',
                customClass: 'group-hover:scale-110',
                iconSvgName: 'home'
            },
            {
                title: 'Explore',
                path: 'explore',
                customClass: 'group-hover:scale-110',
                iconSvgName: 'mobile-explore'
            },
            {
                title: 'Reels',
                path: 'reels',
                customClass: 'group-hover:scale-110',
                iconSvgName: 'reels'
            },
            {
                title: 'Direct',
                path: 'direct',
                customClass: 'group-hover:scale-110',
                iconSvgName: 'direct'
            },
            {
                title: 'Profile',
                path: 'profile',
                customClass: 'group-hover:scale-110',
                img: 'https://i.ibb.co/JQVbxyH/img.jpg',
            }
        ]

        return {
            menuItems
        }
    },
    components: {
        SVGLoader
    }
})
</script>