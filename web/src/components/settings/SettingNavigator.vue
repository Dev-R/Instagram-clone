<template>
	<div 
		:class="{
			'hidden': isMobileScreen && activeSettingTab !== null,
		}"
		class="flex flex-col h-full basis-2/6 font-sans font-normal text-xs text-white border-r border-[#363636]">
		<SettingInfo />

		<SettingTabs 
			@edit-profile="$emit('edit-profile')" />
	</div>
</template>

<script setup lang="ts">
import {
    SettingInfo,
    SettingTabs
} from '@/components'

defineProps({
    isMobileScreen: {
        type: Boolean,
        required: true
    },
    activeSettingTab: {
        type: String as () => string | null
    }
})

defineEmits(['edit-profile'])
</script>