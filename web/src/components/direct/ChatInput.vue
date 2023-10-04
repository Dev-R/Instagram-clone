<template>
	<div class="flex absolute inset-x-3 md:bottom-2 bottom-8 rounded-full space-x-3">
		<!-- Emojis -->
		<div
			class="cursor-pointer inset-y-0 left-0 \
                    flex items-center">
			<span class="relative">
				<EmojiPickerModal
					:toggle-direction="'left'" 
					@selectEmoji="appendEmoji" />
			</span>
		</div>                             
                
		<!-- Chat Area -->
		<textarea
			ref="textArea"
			tabindex="1"
			rows="1"
			maxlength="100"
			type="text"
			class="bg-black border border-[#262626] text-white 
                rounded-full text-sm focus:outline-none disabled:cursor-not-allowed
                block w-full p-2.5 resize-none"
			placeholder="Message..."
			:class="{ 'rounded-lg ': !isChatEmpty }"
			:value="modalValue" 
			:disabled="isChatLoading"
			@keyup.enter="emitSendMessage"></textarea>
            
		<!-- Gallery -->
		<div
			class="self-center"
			:class="{ 'hidden': !isChatEmpty }"
			@click="emitFileUpload">
			<SVGLoader
				:icon="'gallery'" 
				:class="'cursor-pointer md:absolute inset-y-0 right-20 \
                    flex items-center'" /> 
		</div>

		<!-- Like/Heart -->
		<div
			class="self-center"
			:class="{ 'hidden': !isChatEmpty }"
			@click="emitLikeIcon()">
			<SVGLoader
				:icon="'like'" 
				:class="'cursor-pointer md:absolute inset-y-0 right-12 \
                    flex items-center'" />     
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    ref
} from 'vue'

import {
    EmojiPickerModal,
    SVGLoader
} from '@/components'

import type {
    Emoji
} from '@/common'

defineProps({
    modalValue: {
        type: String as () => string | number | string[] | undefined,
        default: undefined
    },
    isChatEmpty: {
        type: Boolean,
        required: true
    },
	isChatLoading: {
		type: Boolean,
		required: true
	}
})

const emit = defineEmits([
    "onLikeIcon",
    "onSendMessage",
    "onFileUpload"
])
// DOM Refs
const textArea = ref<HTMLInputElement | null>()
/**
 * Emit new message
 */
const emitSendMessage = (payload: KeyboardEvent) => {
    emit("onSendMessage", payload)
}
/**
 * Emit like icon
 */
const emitLikeIcon = () => {
    emit("onLikeIcon")
}
/**
 * Emit file upload
 */
const emitFileUpload = () => {
    emit("onFileUpload")
}
/**
 * Append emoji to textarea
 */
const appendEmoji = (emoji: Emoji) => {
    if (textArea.value) {
        textArea.value.focus()
        textArea.value.value += emoji.i
    }
}
</script>