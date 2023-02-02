<template>
    <div
        class="min-h-screen bg-white">
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