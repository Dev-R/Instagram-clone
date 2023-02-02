<template>
    <div class="w-full">
        <p>This is Chat</p>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'Chat',
    setup() {
        onMounted(() => {
            // console.log('Mounted Chat')
        })

        return {}
    }
})
</script>