<template>
	<div class="flex md:space-x-14 md:pl-14 md:pb-8 space-x-7">
		<!-- User Profile image -->
		<div>
			<img 
				:src="user.profilePictureUrl" 
				class="md:w-36 md:h-36 h-20 w-20 rounded-full ml-9" />
		</div>

		<!-- User profile stats -->
		<ProfileStats
			:user="user" 
			@open-modal="$emit('open-modal', $event)" />
	</div>
	<ProfileStatsMobile
		@open-modal="$emit('open-modal', $event)"
		:user="user" />
</template>

<script setup lang="ts">
import type {
    PropType
} from 'vue'

import type {
    User
} from '@/common'

import {
    ProfileStats,
	ProfileStatsMobile
} from '@/components'

defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    }
})

defineEmits([
	'open-modal'
])
</script>