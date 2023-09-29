<template>
	<div class="md:pl-20 bg-black flex flex-col space-y-6">
		<div 
			class="md:flex md:flex-row flex-col md:space-x-4 
            space-y-3 items-center">
			<!-- User name -->
			<div 
				class="md:pl-0 pl-6 font-sans text-lg font-normal
                text-white text-left md:mt-4">
				{{ user.userName }}
			</div>

			<!-- Personal logged-in user Options -->
			<div class="md:pl-0 pl-6">
				<TheButton 
					:color="'dark'" 
					:size="'md'" 
					:is-full="true">
					<span 
						class="sm:text-md text-xs font-semibold"
						@click="goToSettingsRoute">
						Edit Profile
					</span>
				</TheButton>
			</div>
			<div class="md:pl-0 pl-6 hidden sm:block">
				<TheButton 
					:color="'dark'" 
					:size="'md'" 
					:is-full="true">
					<span class="sm:text-md text-xs font-semibold">
						View Archive
					</span>
				</TheButton>
			</div>

			<!-- Logged-in user Options -->
			<div>
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
	<ProfileSettingModal
			v-show="isSettingModalToggled"
			@on-modal-closed="toggleSettingModal" />
</template>

<script setup lang="ts">
import {
	ref,
    type PropType
} from 'vue'

import {
    useRouter
} from 'vue-router'

import {
    TheButton,
    SVGLoader,
	ProfileSettingModal
} from '@/components'

import {
    ModalType,
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
const isSettingModalToggled = ref(false)
const userProfileStats = [{
        title: 'posts',
        count: prop.user.mediaCount, // TODO: Change mediaCount to postCount
        action: () => {},
    },
    {
        title: 'followers',
        count: prop.user.followerCount,
        action: () => emitModal(ModalType.Follow, 'Followers'),
    },
    {
        title: 'following',
        count: prop.user.followingCount,
        action: () => emitModal(ModalType.Follow, 'Following'),
    }
]

// Services
const router = useRouter()

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
	isSettingModalToggled.value = !isSettingModalToggled.value
}

/**
 *  Emits a modal event to open a modal
 * @param modalType The type of modal to open (Follow, Settings, etc.)
 * @param modalTitle The title of the modal to open (Followers, Following, etc.)
 */
const emitModal = (modalType: ModalType, modalTitle: string) => {
    emit('openModal', {
        modalType,
        modalTitle
    })
}
</script>