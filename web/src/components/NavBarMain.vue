<template>
    <div class="w-full">
        <p>This is NavBarMain</p>
    </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'NavBarMain',
    setup() {
        onMounted(() => {
            // console.log('Mounted NavBarMain')
        })

        return {}
    }
})
</script>