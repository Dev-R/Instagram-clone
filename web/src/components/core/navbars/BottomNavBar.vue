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
                @click="updateActiveNavBar(item.path, item.title)"
                :class="{ 
                    'bg-slate-1000 animate-pulse': item.path === activeNavBar
                }"
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
    defineComponent,
    ref,
    onMounted,
    computed
} from 'vue'

import { 
    useRoute, 
    useRouter 
} from 'vue-router'

import {
    SVGLoader
} from '@/components'

import type { 
    NavBarItem 
} from '@/common'

export default defineComponent({
    name: 'BottomNavBar',
    setup() {

        const activeNavBar = ref<NavBarItem['path']>()
        const route = useRoute()
        const router = useRouter()

        const updateActiveNavBar = (navBarTab: NavBarItem['path'], routeName: string | undefined) => {
			activeNavBar.value = navBarTab
            // Check if routeName is undefined or null and return if it is
            if (!routeName) return
            router.push({ name: routeName })
		}

        const menuItems: NavBarItem[] = [
            {
                title: 'home',
                path: 'home',
                customClass: 'group-hover:scale-110',
                iconSvgName: 'home'
            },
            {
                title: 'explore',
                path: 'explore',
                customClass: 'group-hover:scale-110',
                iconSvgName: 'mobile-explore'
            },
            {
                title: 'reels',
                path: 'reels',
                customClass: 'group-hover:scale-110',
                iconSvgName: 'reels'
            },
            {
                title: 'direct',
                path: 'direct',
                customClass: 'group-hover:scale-110',
                iconSvgName: 'direct'
            },
            {
                title: 'Profile',
                path: '/BrainFuckUser?isSelf=1',//TODO: Remove, only for demo.
                name: 'profile',
                customClass: '',
                iconSvgName: '',
                img: 'https://avatars.githubusercontent.com/u/83784102?v=4',
                onClick: () => {}
            }
        ]

        const routeName = computed(()=> {
			return route.name ? route.name.toString() : ''
		})

        onMounted(() => {
			updateActiveNavBar(routeName.value, undefined)
		})

        return {
            menuItems,
            updateActiveNavBar,
            activeNavBar
        }
    },
    components: {
        SVGLoader
    }
})
</script>