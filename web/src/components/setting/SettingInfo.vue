<template>
	<div class="flex flex-col bg-black p-5 space-y-4 border-b-2 border-[#363636]">
		<SVGLoader 
			:icon="'meta'" />
		
		<div class="text-md md:text-lg font-semibold text-white">
			Accounts Center
		</div>
	
		<div>
			Manage your connected experiences and account settings across Meta technologies.
		</div>
	
		<div class="space-x-2">
			<i class="fa-solid fa-user text-white"></i>
			<span>
				Personal Details
			</span>
		</div>
	
		<div class="space-x-1 flex flex-nowrap">
			<i class="fa-solid fa-shield text-white"></i>
			<span>
				Password and Security
			</span>
		</div>
	
		<div class="space-x-2">
			<i class="fa-solid fa-newspaper text-white"></i>
			<span>
				Ad preferences
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    SVGLoader,
} from '@/components'
</script>