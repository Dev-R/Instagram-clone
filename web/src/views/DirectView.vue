<template>
    <div class="w-full">
        <p>This is Chat</p>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'Direct',
    setup() {
        onMounted(() => {
            console.log('Mounted Direct')
        })

        return {}
    }
})
</script>