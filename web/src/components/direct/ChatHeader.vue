<template>
	<div 
		class="flex lg:h-16 w-full space-x-2 md:justify-between p-3
        items-center border-slate-700 border-b">
		<div 
			class="rotate-[270deg] hover:cursor-pointer"
			@click="emitChatBack">
			<SVGLoader 
				:icon="'back-arrow'" 
				:class="'group-hover:scale-110'" />
		</div>

		<div class="flex space-x-2 items-center">
			<img 
				:src="viewer?.profilePictureUrl"
				class="cursor-pointer h-10 w-10 rounded-full shadow-lg" />

			<div class="cursor-pointer font-sans text-sm font-bold text-white pt-1">
				{{ viewer?.userName }}
			</div>
		</div>

		<div 
			class="flex space-x-4 cursor-pointer md:visible invisible">
			<SVGLoader 
				:icon="'audio-call'"
				@click="emitAudioCall" />
			<SVGLoader 
				:icon="'video-call'"
				@click="emitVideoCall" />
			<SVGLoader 
				:icon="'chat-info'"
				@click="emitChatInfo" />
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    SVGLoader
} from '@/components'

import type {
    Viewer
} from '@/common'

defineProps({
    viewer: {
        type: Object as() => Viewer | undefined,
        required: true
    }
})

const emit = defineEmits([
    "onAudioCall",
    "onVideoCall",
    "onChatInfo",
    "onChatBack"
])

/**
 * Emit Audio Call
 */
const emitAudioCall = () => {
    emit("onAudioCall")
}
/**
 * Emit Video Call
 */
const emitVideoCall = () => {
    emit("onVideoCall")
}
/**
 * Emit Chat Info
 */
const emitChatInfo = () => {
    emit("onChatInfo")
}
/**
 * Emit Chat Info
 */
const emitChatBack = () => {
    emit("onChatBack")
}
</script>