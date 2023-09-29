<template>
    <div class="sm:min-h-screen h-screen min-w-screen bg-black">
        <TopNavBar 
            v-if="!topNavBarHiddenRoutes.includes(routeName)"/>
        <RouterView />
        <!-- Mobile Navbar -->
        <BottomNavBar 
            v-if="!bottomNavBarHiddenRoutes.includes(routeName)"/>

    </div>
</template>

<script setup lang="ts">
import {
    onMounted,
    computed
} from 'vue';
import {
    useRoute
} from 'vue-router';

import {
    TopNavBar,
    BottomNavBar
} from '@/components'

// Routes without no top/bottom navbars
const topNavBarHiddenRoutes = ['style', 'stories', 'direct', 'reels', 'explore']
const bottomNavBarHiddenRoutes = ['stories', 'style', 'direct']

// Services
const route = useRoute()

// Computed
const routeName = computed(() => {
    return route.name ? route.name.toString() : ''
})

onMounted(() => {
    // console.log('Mounted LayoutMain')
})
</script>