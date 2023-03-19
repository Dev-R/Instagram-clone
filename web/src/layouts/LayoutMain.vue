<template>
    <div
        class="min-h-screen min-w-screen bg-black">
        <TopNavBar />
        <RouterView />
        <!-- Mobile Navbar -->
        <NavBarMobile />
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue';

import NavBarMobile from '@/components/navbars/NavBarMobile.vue';
import SVGLoader from '@/components/basics/SVGLoader.vue';
import TopNavBar from '@/components/navbars/TopNavBar.vue';



export default defineComponent({
    name: 'LayoutMain',
    setup() {
        onMounted(() => {
            // console.log('Mounted LayoutMain')
        })

        return {}
    },
    components: {
    NavBarMobile,
    SVGLoader,
    TopNavBar
}
})
</script>