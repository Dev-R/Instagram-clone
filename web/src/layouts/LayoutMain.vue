<template>
    <div class="sm:min-h-screen min-w-screen bg-black">
        <TopNavBar 
            v-if="!topNavBarHiddenRoutes.includes(routeName)"/>
        <RouterView />
        <!-- Mobile Navbar -->
        <BottomNavBar 
            v-if="!bottomNavBarHiddenRoutes.includes(routeName)"/>

    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

import BottomNavBar from '@/components/navbars/BottomNavBar.vue';
import SVGLoader from '@/components/basics/SVGLoader.vue';
import TopNavBar from '@/components/navbars/TopNavBar.vue';



export default defineComponent({
    name: 'LayoutMain',
    setup() {

        // Routes without no top/bottom navbars
        const topNavBarHiddenRoutes = ['style', 'stories', 'direct', 'reels']
        const bottomNavBarHiddenRoutes = ['stories', 'style', 'direct', 'reels']

        // Services
        const route = useRoute()

        // Computed
        const routeName = computed(()=> {
            return route.name ? route.name.toString() : ''
        })

        onMounted(() => {
            // console.log('Mounted LayoutMain')
        })

        return {
            routeName,
            topNavBarHiddenRoutes,
            bottomNavBarHiddenRoutes
        }
    },
    components: {
        BottomNavBar,
        SVGLoader,
        TopNavBar
    }
})
</script>