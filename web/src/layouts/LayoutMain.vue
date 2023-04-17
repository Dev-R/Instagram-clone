<template>
    <div
        class="min-h-screen min-w-screen bg-black">
        <TopNavBar 
            @on-create="triggerMobileFileUpload"/>
        <RouterView 
            :call-mobile-file-upload-trigger="isTriggered "/>
        <!-- Mobile Navbar -->
        <NavBarMobile />
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue';

import NavBarMobile from '@/components/navbars/BottomNavBar.vue';
import SVGLoader from '@/components/basics/SVGLoader.vue';
import TopNavBar from '@/components/navbars/TopNavBar.vue';



export default defineComponent({
    name: 'LayoutMain',
    setup() {

        // Checkers
        const isTriggered  = ref<boolean>(false)

        // Methods
        /**
         * Trigger fileUpload in Home route using mobile Navbar
         */
        const triggerMobileFileUpload = () => {
            isTriggered.value = !isTriggered.value
        }

        onMounted(() => {
            // console.log('Mounted LayoutMain')
        })

        return {
            triggerMobileFileUpload,
            isTriggered
        }
    },
    components: {
    NavBarMobile,
    SVGLoader,
    TopNavBar
}
})
</script>