<template>

</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'


export default defineComponent({
    name: 'NAME',
    setup(prop) {
        onMounted(() => {
        })

        return { }
    },
    props: {
        prop: {
            type: Object as () => {},
            required: true
        }
    }
})
</script>