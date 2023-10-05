<template>
	<div 
		class="p-4 border-l-2 focus:border-[#fafafa] 
        hover:bg-[#121212] hover:border-[#363636] cursor-pointer"
		@click="$emit('edit-profile')">
		Edit Profile
	</div>

	<div 
		v-for="setting in settings"
		:key="setting"
		class="p-4 hover:border-l-2 hover:bg-[#121212] 
        hover:border-[#363636] cursor-not-allowed">
		{{ setting }}
	</div>
</template>

<script setup lang="ts">
defineEmits(['edit-profile'])

const settings = [
    'Language preferences',
    'Apps and Websites',
    'Email Notifications',
    'Push Notifications',
    'What you can see',
    'How others can interact with your content',
    'Supervision',
    'Help'
]
</script>