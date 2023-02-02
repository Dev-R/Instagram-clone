<template>
    <div class="w-full">
        <p>This is Login</p>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'Login',
    setup() {
        onMounted(() => {
            // console.log('Mounted Login')
        })

        return {}
    }
})
</script>