<template>
	<div class="flex flex-col h-dynamic-screen sm:h-screen">
        <RouterView />
        <footer class="block text-sm text-gray-500 text-center dark:text-gray-400 m-4">
            <a 
                href="https://github.com/Dev-R/PhotoFlow" 
                class="hover:underline text-rose-400 font-semibold">
                <i class="fa-brands fa-github text-black"></i>
                PhotoFlow
            </a> 
            <br class="sm:hidden my-4"/>
            Made by 
            <i class="fa-solid fa-heart text-rose-500"></i>
            by 
            <a 
                href="https://github.com/Dev-R"
                class="font-sans text-sm text-rose-500">
                Dev-R
            </a>.
        </footer>
	</div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutAuth',
    setup() {
        onMounted(() => {
        })

        return {}
    }
})
</script>