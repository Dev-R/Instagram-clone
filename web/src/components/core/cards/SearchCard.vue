<template>
    <div 
        @click="goToUserProfile(searchResult.userName)"
        class="rounded-lg flex items-center space-x-2 w-full p-2 h-12 cursor-pointer">
        <div class="flex-inital flex-none">
            <img 
                :src="searchResult.profilePictureUrl"
                class="w-14 h-14 sm:h-16 sm:w-16 rounded-full">
        </div>

        <div class="flex flex-inital flex-col">

            <span class="font-sans text-sm font-semibold text-white self-start">
                {{ searchResult.userName }}
            </span>
            
            <div class="font-sans text-xs font-semibold text-gray-400 text-ellipsis overflow-hidden self-start">
                {{ searchResult.bio }}
            </div>

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

import router from '@/router'

defineProps({
    searchResult: {
        type: Object as PropType<SearchCard>,
        required: true
    }
})

const goToUserProfile = (userName: string) => {
	router.push({ name: 'profile', params: { username: userName }, query: { isSelf: 0 } })
}
</script>
