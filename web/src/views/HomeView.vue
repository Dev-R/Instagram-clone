<template>
    <div class="bg-gray-400">
        <section class="container max-w-full mx-auto text-center">
            <div class="grid grid-cols-12 gap-1">
                <div class="col-span-2 p-4 rounded-lg shadow-lg bg-fuchsia-500 md:block hidden">
                    A
                </div>
                <div class="lg:col-span-8 md:col-span-10 col-span-12 p-4 rounded-lg shadow-lg bg-fuchsia-500 h-screen">
                    B
                </div>
                <div class="col-span-2 p-4 rounded-lg shadow-lg bg-fuchsia-500 lg:block hidden">
                    C
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup() {
        onMounted(() => {
            // console.log('Mounted Home')
        })

        return {}
    }
})
</script>

<!-- 
   A : 2 
   B : 8
   C : 2

-->