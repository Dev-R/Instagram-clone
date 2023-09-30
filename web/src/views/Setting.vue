<template>
	<div class="bg-black h-screen">
		<section 
			class="container md:max-w-full mx-auto h-screen
			scrollbar scrollbar-thumb-gray-900"
			:class="{ 'brightness-50 pointer-events-none': isModalToggled }">
			<div class="flex">
				<div 
					class="basis-1/6 md:block hidden space-y-12
                    sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>

				<div 
					class="md:flex md:flex-row md:p-0 md:place-self-center md:max-w-4xl mx-auto 
                    sm:p-2 border-[#363636] border-2 w-full h-4/5">
					<SettingNavigator 
						:active-setting-tab="activeSettingTab"
						:is-mobile-screen="isMobileScreen"
						@edit-profile="activeSettingTab = 'edit-profile'" />


					<SettingForm 
						:user="user"
						:is-mobile-screen="isMobileScreen"
						:active-setting-tab="activeSettingTab"
						@gender-modal="toggleGenderModal" />
				</div>
			</div>
		</section>
		<GenderModal 
			:title="genderModal.title"
			:is-toggled="genderModal.isToggled" 
			:items="genderModal.items"
			:modal-type="ModalName.GENDER" 
			:modal-size="ModalSize.Medium"
			@on-modal-closed="toggleGenderModal" />
	</div>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    onMounted
} from 'vue'

import {
    NavBarMain,
    SmallModal as GenderModal,
    SettingNavigator,
    SettingForm
} from '@/components'

import {
    ScreenBreakpoint,
    ModalSize,
    ModalName,
    type Gender,
    type User,
} from '@/common'

const user = ref<User>({
    id: '0',
    firstName: 'Alex',
    lastName: 'Boo',
    userName: 'Alex_boo',
    profilePictureUrl: 'https://loremflickr.com/1024/1280/holiday',
    dateJoined: '01-01-2012',
    followerCount: 0,
    followingCount: 0,
    mediaCount: 50,
    gender: 'Female',
    mediaItems: [],
})
const genderModal = ref({
    name: '',
    title: 'Gender',
    items: [{
            name: 'male'
        },
        {
            name: 'female'
        },
        {
            name: 'other'
        }
    ] as Gender[] | undefined,
    selectedGender: 'Female',
    isToggled: false
})

const activeSettingTab = ref<null| string>(null)
const screenWidth = ref<number>(window.innerWidth) // Current window width

const toggleGenderModal = () => {
    genderModal.value.isToggled = !genderModal.value.isToggled
}

const isModalToggled = computed(() => {
    return genderModal.value.isToggled
})

const isMobileScreen = computed(() => {
    console.log("Screen width: ", screenWidth.value)
    return screenWidth.value <= ScreenBreakpoint.Medium
})

onMounted(() => {
    screenWidth.value = window.innerWidth 
})
</script>