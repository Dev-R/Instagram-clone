<template>
	<div class="flex justify-between items-center space-x-2 p-2.5 pb-2 border-b 
		 border-gray-600 sm:hidden fixed top-0 left-0 right-0 z-50 bg-black">
		<input
			class="w-full bg-black text-white border-1 border-gray-400 rounded-lg h-8
            text-sm focus:outline-none placeholder-gray-400"
			placeholder="Search"
			@focus.prevent="navigateToSearch" />

		<div class="text-sm text-white font-sans font-semibold">
			Cancel
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    useRouter
} from 'vue-router'

const router = useRouter()

const navigateToSearch = () => {
    useRouter().push({name: 'search'})
}
</script>