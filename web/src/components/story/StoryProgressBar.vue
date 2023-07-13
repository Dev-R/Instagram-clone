<template>
    <div class="absolute inset-x-3 top-2 w-11/12 bg-gray-400 rounded-full h-0.5">
        <div 
            class="bg-gray-200 h-0.5 rounded-full" 
            :style="{ 'width': progressPercentage + '%' }">
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
name: 'StoryProgressBar',
props: {
    progressPercentage: { 
        type: Number,
        required: true
    }
}
})
</script>