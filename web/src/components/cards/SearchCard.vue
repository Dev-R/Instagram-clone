<template>
    <div class="rounded-lg flex items-center space-x-2 w-full p-2 h-12">
        <div class="flex-inital">
            <img 
                :src="searchResult.profilePictureUrl"
                class="w-8 h-8 lg:w-14 lg:h-14 rounded-full">
        </div>

        <div class="flex flex-inital flex-col">

            <span class="font-sans text-sm font-semibold text-white self-start">
                {{ searchResult.userName }}
            </span>
            
            <span class="font-sans text-xs font-semibold text-gray-400 self-start">
                {{ searchResult.bio }}
            </span>

        </div>
    </div>
</template>

<script setup lang="ts">
import type { 
    PropType 
} from 'vue'

import type {
    SearchCard
} from '@/common'

defineProps({
    searchResult: {
        type: Object as PropType<SearchCard>,
        required: true
    }
})
</script>
