<template>
	<div class="relative sm:max-h-[868.5px] cursor-pointer">
		<video
			:id="reel.id"
			:muted="isVideoMuted"
			:src="reel.reelMedia.mediaUrl"
			:controls="false"
			class="sm:rounded cursor-pointer h-dynamic-screen 
			sm:h-auto max-w-none md:max-w-full md:w-11/12"
			loop
			defaultMuted
			playsinline
			oncontextmenu="return false"
			preload="auto"
			@play="updateVideoPlayingStatus"
			v-on="{ click: isVideoPlaying ? () => pauseVideo() : () => playVideo() }">
		</video>

		<!-- Mute Button -->
		<button
			class="absolute top-3 z-50
			sm:flex items-center justify-center
			cursor-pointer group hidden
			focus:outline-none"
			@click="toggleVideoMute">
			<span
				class="inline-flex items-center justify-center
				lg:w-8 lg:h-8 w-6 h-6 rounded-full
				group-focus:outline-none transparent-gray">

				<i
                    class="fa-solid text-sm text-gray-300"
					:class="{
						'fa-volume-high': !isVideoMuted,
						'fa-volume-xmark': isVideoMuted,
					}">
				</i>

			</span>
		</button>

		<!-- Play Button -->
		<button
			class="absolute top-0
			sm:left-56 left-1/2 z-30 duration-300 ease-in-out
			sm:flex items-center justify-center
			h-full cursor-pointer group hidden
			focus:outline-none"
			v-on="{ click: isVideoPlaying ? () => pauseVideo() : () => playVideo() }">
			<span
				:class="{
					'invisible w-full h-full' : isVideoPlaying
				}"
				class="inline-flex items-center transparent-black
				justify-center rounded-full w-16 h-16
				group-focus:outline-none">
				<i
					class="fa-solid
					text-2xl text-gray-300"
					:class="{
						'fa-play': !isVideoPlaying,
					}">
				</i>
			</span>
		</button>

        <!-- Meta card -->
		<div class="absolute bottom-3 left-5 flex flex-col space-y-3 basis-full mb-11 sm:mb-0">
            <!-- Simple User card -->
			<UserCard
				:profile-link="reel.userName"
				:profile-image="reel.profilePictureUrl"
				@on-action-click="$emit('onFollowRequest', reel as ReelPost)">
				<template #user-name>
					{{ reel.userName }}
				</template>

				<template
					#action-name>
					{{ reel.isFollowed ? 'Following' : 'Follow' }}
				</template>
			</UserCard>

			<div class="text-white font-normal text-sm">
				{{ reel.reelMedia.title }}
			</div>

            <!-- Caption and Location -->
			<div class="flex flex-row flex-nowrap">

				<!-- Caption -->
				<div class="text-sm font-sans text-white flex flex-row">
					<i class="fa-solid fa-music text-white text-xs p-1">
					</i>

					<div class="relative flex overflow-x-hidden w-48">
						<div class="animate-marquee whitespace-nowrap">
							<span class="mx-4">{{ reel.caption }}</span>
						</div>

						<div class="absolute top-0 animate-marquee2 whitespace-nowrap">
							<span class="mx-4">{{ reel.caption }}</span>
						</div>
					</div>
				</div>

				<!-- Location -->
				<div class="text-sm font-sans text-white">
					<i class="fa-solid fa-location-dot text-xs p-1"></i>
					<span>
						{{ reel.reelMedia.location }}
					</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Side Buttons -->
	<div class="absolute flex flex-col inset-y-2/3 right-0 space-y-7">
		<!-- Like -->
		<div 
			class="flex flex-col sm:hover:brightness-50 cursor-pointer"
			@click="$emit('onLikeStateChange', reel as ReelPost)">
			<SVGLoader 
				v-if="reel.hasLiked"
				:icon="'like'" />
			
			<SVGLoader 
				v-else
				:icon="'unlike'" />
			<div class="text-xs font-sans text-white self-center">
				{{ reel.likeCount }}
			</div>
		</div>

		<!-- Comment -->
		<div 
			@click="$emit('onComments')"
			class="flex flex-col sm:hover:brightness-50 cursor-pointer">
			<i class="fa-regular fa-comment text-white text-2xl"></i>
			<div class="text-xs font-sans text-white self-center">
				{{ reel.commentCount }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { ReelPost } from '@/common'
import { SVGLoader, SmallCard as UserCard } from '@/components'

// Video handlers
const isVideoMuted = ref<boolean>(true) // Check if video is currently muted or not
const isVideoPlaying = ref<boolean>(false) // Check if video is playing or not

// Props
const prop = defineProps({
	reel: {
		type: Object as () => ReelPost,
		required: true
	},
	activeVideo: {
		type: null as unknown as PropType<HTMLVideoElement | undefined>,
		required: true
	}
})

// Emitters
defineEmits([
	'onLikeStateChange',
	'onFollowRequest',
	'onComments'
])

/**
* Mutes or unmutes the current active video
*/
const toggleVideoMute = () => {
	const video = prop?.activeVideo
	isVideoMuted.value = !video?.muted
}


/**
* Pauses the current active video
*/
const pauseVideo = () => {
	const video = prop?.activeVideo
	video?.pause()
	updateVideoPlayingStatus()
}

/**
* Plays the current active video
*/
const playVideo = () => {
	const video = prop?.activeVideo
	video?.play()
	updateVideoPlayingStatus()
}

/**
* Update is-video-playing flag for tracking
*/
const updateVideoPlayingStatus = () => {
	const video = prop?.activeVideo
	isVideoPlaying.value = !video?.paused
}

</script>