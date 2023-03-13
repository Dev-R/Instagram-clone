<template>
	<div class="h-screen bg-black">
		<div class="grid grid-cols-6">
			<div class="col-start-3 col-span-2 p-5">
				<RouterView />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutAuth',
    setup() {
        onMounted(() => {
            // console.log('Mounted LayoutAuth')
        })

        return {}
    }
})
</script>