<template>
    <div class="w-full">
        <p>This is Home</p>
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