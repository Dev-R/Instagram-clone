<template>
	<div class="absolute py-2 text-lg inset-x-3 top-5 flex flex-row flex-nowrap justify-between w-11/12">
		<!-- User Info -->
		<div class="flex flex-row space-x-2">
			<!-- Picture -->
			<img 
				class="w-8 h-8 rounded-full object-cover relative"
				:src="story.profilePictureUrl" />

			<!-- Username -->
			<div class="text-sm text-white self-center space-x-1">
				<span>
					{{ story.userName }}
				</span>
                
				<span>
					{{ story.expiringAt }}
				</span>
			</div>
		</div>

		<!-- Story Controllers -->
		<div class="flex flex-row space-x-4 pt-2 text-white self-end">
			<!-- Players -->
			<span @click="onStoryPlay">
				<i 
					v-if="isStoryPlaying"
					class="fa-solid fa-pause
                    cursor-pointer"></i>
				<i 
					v-else
					class="fa-solid fa-play 
                    cursor-pointer"></i>
			</span>

			<!-- Muters -->
			<span @click="onStoryMute">
				<i 
					v-if="isStoryMuted"
					class="fa-solid fa-volume-xmark
                    Mutecursor-pointer"></i>
				<i 
					v-else
					class="fa-solid fa-volume-high
                    cursor-pointer"></i>
			</span>

			<!-- Others -->
			<i class="fa-solid fa-ellipsis self-center cursor-pointer hidden sm:block"></i>
			<i 
				class="fa-solid fa-x self-center cursor-pointer block sm:hidden"
				@click="onModalClosed()"></i>
		</div>
	</div>
</template>


<script setup lang="ts">
import {  
	watchEffect, 
	ref,
	type PropType 
} from 'vue'

import { 
	useToast 
} from 'vue-toastification'

import type {
	StoryCarousel,
	StoryMedia,
	StoryType
} from '@/common'

const props = defineProps({
	story: {
		type: Object as PropType<StoryCarousel>,
		required: true
	},
	activeStoryMedia: {
		type: null as unknown as PropType<StoryMedia>,
		required: true
	},
	activeStoryType: {
		type: null as unknown as PropType<StoryType>,
		required: true
	},
	isCommentInputFocused: {
		type: Boolean,
		required: true
	}
})

const emit = defineEmits([
	'onModalClosed',
	'onResumeStory',
	'onPauseStory'
])

const isStoryPlaying = ref(true) // All stories are playing by default
const isStoryMuted = ref(true)

// Services
const toast = useToast()


// Video controllers
/**
 * Play story video if the current story contains a video
 */
const playStoryVideo = () => {
	if (props.activeStoryType === 'Video') {
		const video = props.activeStoryMedia as HTMLVideoElement
		video?.play()
		matchStoryVideoMute(video)
	}
}

/**
 * Pause story video if the current story contains a video
 */
const pauseStoryVideo = () => {
	if (props.activeStoryType === 'Video') {
		const video = props.activeStoryMedia as HTMLVideoElement
		video?.pause()
	}
}

/**
 * Mute story video if the current story contains a video
 */
const invertMuteStoryVideo = () => {
	if (props.activeStoryType === 'Video') {
		const video = props.activeStoryMedia as HTMLVideoElement
		video.muted = !video.muted
		matchStoryVideoMute(video)
	} else {
		unsupportedMediaMute()
	}
}

const matchStoryVideoMute = (video: HTMLVideoElement) => {
	isStoryMuted.value = video.muted
}

const muteStory = () => {
	isStoryMuted.value = true
}

// const unmuteStory = () => {
//     isStoryMuted.value = false
// }


const unsupportedMediaMute = () => {
	toast.info('Video has no sound.')
}


const onStoryPlay = () => {
	isStoryPlaying.value = !isStoryPlaying.value
}

const playStory = () => {
	isStoryPlaying.value = true
}

const pauseStory = () => {
	isStoryPlaying.value = false
}

const onStoryMute = () => {
	invertMuteStoryVideo()
}

/**
* Emit signal when the modal is closed
* @event modal-closed
*/
const onModalClosed = () => {
	emit('onModalClosed')
}

/**
 * Handle story pauses and plays
 */
watchEffect(() => {
	isStoryPlaying.value ? emit('onResumeStory') : emit('onPauseStory')
})

watchEffect(() => {
	props.activeStoryType === 'Video' ? playStoryVideo() : muteStory()
})

defineExpose({
	playStoryVideo,
	pauseStoryVideo,
	pauseStory,
	playStory
})
</script>