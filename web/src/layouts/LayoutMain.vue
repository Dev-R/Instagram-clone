<template>
    <div
        class="min-h-screen min-w-screen bg-black">
        <RouterView/>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutMain',
    setup() {
        onMounted(() => {
            // console.log('Mounted LayoutMain')
        })

        return {}
    }
})
</script>