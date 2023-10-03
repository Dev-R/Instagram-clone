<template>
	<div class="md:pl-20 bg-black flex flex-col space-y-6">
		<div 
			class="md:flex md:flex-row flex-col md:space-x-4 
            space-y-3 items-center">
			<!-- User name -->
			<div 
				class="md:pl-0 font-sans text-lg font-normal
                text-white text-left md:mt-4">
				{{ user.userName }}
			</div>

			<div 
				v-if="!hideControls()"
				class="flex flex-row space-x-6">
				<!-- Personal logged-in user Options -->
				<div class="md:pl-0">
					<TheButton 
						:color="'dark'" 
						:size="'sm'" 
						:is-full="true">
						<span 
							class="lg:text-md text-sm font-semibold"
							@click="goToSettingsRoute">
							Edit Profile
						</span>
					</TheButton>
				</div>
				<div class="md:pl-0">
					<TheButton 
						:color="'dark'" 
						:size="'sm'" 
						:is-full="true">
						<span class="sm:text-md text-sm font-semibold">
							View Archive
						</span>
					</TheButton>
				</div>
			</div>


			<!-- Logged-in user Options -->
			<div v-if="!hideControls()">
				<SVGLoader 
					:icon="'profile-options'"
					:class="'md:block hidden sm:hover:cursor-pointer'" 
					@click="toggleSettingModal" />
			</div>
		</div>

		<!-- Profile Stats Rendering -->
		<div class="md:block hidden">
			<div class="flex space-x-10">
				<div 
					v-for="(stats, index) of userProfileStats"
					:key="index"
					class="font-sans text-md font-normal 
                    text-white sm:hover:cursor-pointer"
					@click="stats.action">
					<span class="font-sans text-sm font-bold text-white">
						{{ stats.count }}
					</span>
					{{ stats.title }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type{
	PropType
} from 'vue'

import {
	useRoute,
    useRouter
} from 'vue-router'

import {
    TheButton,
    SVGLoader,
} from '@/components'

import {
    ModalName,
    type User,
} from '@/common'

const prop = defineProps({
    user: {
        type: Object as PropType<User> ,
        required: true
    }
})
const emit = defineEmits(['openModal'])

// Data
const userProfileStats = [{
        title: 'posts',
        count: prop.user.mediaItems.length, // TODO: Change mediaCount to postCount
        action: () => {},
    },
    {
        title: 'followers',
        count: prop.user.followerCount,
        action: () => emitModal(ModalName.FOLLOW, 'Followers'),
    },
    {
        title: 'following',
        count: prop.user.followingCount,
        action: () => emitModal(ModalName.FOLLOW, 'Following'),
    }
]

// Services
const router = useRouter()
const route = useRoute()

// Methods
/**
 *  Navigates to the settings route
 */
const goToSettingsRoute = () => {
    router.push({
        name: 'settings'
    })
}

const toggleSettingModal = () => {
	emit('openModal', {
		modalType: ModalName.PROFILE_SETTING,
		modalTitle: ModalName.PROFILE_SETTING
	})
}

/**
 * Cheap way to hide the controls if the user is not the owner of the profile
 * TODO: Remove this when the backend is ready
 */
const hideControls = () => {
	console.log("Route query", route.query)
	return Number(route.query.isSelf) === 1 ? false : true
}

/**
 *  Emits a modal event to open a modal
 * @param modalType The type of modal to open (Follow, Settings, etc.)
 * @param modalTitle The title of the modal to open (Followers, Following, etc.)
 */
const emitModal = (modalType: string, modalTitle: string) => {
    emit('openModal', {
        modalType,
        modalTitle
    })
}
</script>