<template>
    <div class="w-full">
        <p>This is Profile</p>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'Profile',
    setup() {
        onMounted(() => {
            // console.log('Mounted Profile')
        })

        return {}
    }
})
</script>