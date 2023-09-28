<template>
	<div class="bg-black h-screen">
		<section 
			class="container md:max-w-full mx-auto h-screen
			scrollbar scrollbar-thumb-gray-900"
            :class="{ 'brightness-50 pointer-events-none': isModalToggled }">
			<div class="md:grid grid-cols-12 flex justify-center">
				<!-- Left bar: Navigation -->
				<div 
					class="xl:col-span-2 col-span-1 bg-black 
					md:block hidden space-y-12 h-screen 
					sticky top-0 border-r border-gray-900">
					<NavBarMain />
				</div>

				<div 
					class="xl:col-span-8 md:col-span-10 col-span-12 md:justify-self-end md:place-self-center md:flex md:flex-row bg-black border-2 border-[#363636]
					scrollbar scrollbar-thumb-gray-900 md:col-start-2 md:p-0 sm:p-2 w-full md:max-w-4xl h-4/5">

                    <!-- Navigator -->
                    <div 
                        :class="{
                            'hidden': isMobileScreen && activeSettingTab !== null,
                        }"
                        class="flex flex-col h-full basis-2/6 font-sans font-normal text-xs text-white border-r border-[#363636]">

                        <!-- Information / Guide -->
                        <div class="flex flex-col bg-black p-5 space-y-4 border-b-2 border-[#363636]">
                            <!-- TODO: Replace Icon -->
                            <svg aria-label="Facebook wordmark and family of apps logo" height="12" role="img"
                                viewBox="0 0 500 100" width="60">
                                <defs>
                                    <linearGradient gradientUnits="userSpaceOnUse" id="b" x1="125" x2="160.217" y1="97"
                                        y2="57.435">
                                        <stop offset=".21" stop-color="#0278F1"></stop>
                                        <stop offset=".533" stop-color="#0180FA"></stop>
                                    </linearGradient>
                                    <linearGradient gradientUnits="userSpaceOnUse" id="c" x1="44" x2="0" y1="5" y2="64">
                                        <stop offset=".427" stop-color="#0165E0"></stop>
                                        <stop offset=".917" stop-color="#0180FA"></stop>
                                    </linearGradient>
                                    <linearGradient gradientUnits="userSpaceOnUse" id="d" x1="28.5" x2="135" y1="29"
                                        y2="72">
                                        <stop stop-color="#0064E0"></stop>
                                        <stop offset=".656" stop-color="#0066E2"></stop>
                                        <stop offset="1" stop-color="#0278F1"></stop>
                                    </linearGradient>
                                    <clipPath id="a">
                                        <path d="M0 0h496.236v100H0z" fill="#fff"></path>
                                    </clipPath>
                                </defs>
                                <g clip-path="url(#a)">
                                    <path
                                        d="M182.141 3.213h18.808l31.98 57.849 31.979-57.849h18.401V98.27h-15.345V25.416l-28.042 50.448h-14.394l-28.042-50.448V98.27h-15.345V3.213ZM332.804 99.967c-7.107 0-13.353-1.573-18.739-4.718-5.387-3.146-9.586-7.504-12.595-13.07-3.011-5.569-4.515-11.95-4.515-19.148 0-7.287 1.47-13.738 4.413-19.35 2.942-5.613 7.027-10.004 12.255-13.173 5.229-3.168 11.238-4.753 18.027-4.753 6.744 0 12.55 1.596 17.416 4.787 4.865 3.191 8.611 7.661 11.237 13.41 2.624 5.749 3.938 12.492 3.938 20.233v4.21h-52.077c.95 5.794 3.292 10.354 7.027 13.68 3.735 3.328 8.453 4.991 14.157 4.991 4.571 0 8.509-.679 11.814-2.037 3.303-1.358 6.404-3.417 9.302-6.178l8.147 9.98c-8.103 7.425-18.038 11.136-29.807 11.136Zm11.204-56.389c-3.215-3.281-7.425-4.923-12.629-4.923-5.07 0-9.314 1.676-12.731 5.025-3.418 3.35-5.58 7.854-6.484 13.512h37.343c-.453-5.794-2.286-10.331-5.499-13.614ZM382.846 40.014h-14.123V27.453h14.123V6.676h14.802v20.777h21.455v12.561h-21.455v31.844c0 5.295.905 9.075 2.716 11.338 1.809 2.264 4.911 3.395 9.302 3.395 1.945 0 3.598-.078 4.956-.237a92.35 92.35 0 0 0 4.481-.646v12.425c-1.675.498-3.564.906-5.669 1.223a44.63 44.63 0 0 1-6.62.475c-15.979 0-23.968-8.735-23.968-26.208V40.014ZM496.236 98.27h-14.53v-9.913c-2.58 3.712-5.862 6.575-9.845 8.588-3.983 2.014-8.51 3.022-13.579 3.022-6.247 0-11.78-1.596-16.601-4.787s-8.612-7.581-11.373-13.172c-2.761-5.59-4.142-11.983-4.142-19.18 0-7.243 1.403-13.648 4.21-19.216 2.806-5.567 6.688-9.935 11.645-13.104 4.956-3.168 10.648-4.753 17.075-4.753 4.844 0 9.189.94 13.037 2.818a25.768 25.768 0 0 1 9.573 7.978v-9.098h14.53V98.27Zm-14.801-46.035c-1.585-4.028-4.085-7.207-7.503-9.54-3.418-2.33-7.367-3.496-11.848-3.496-6.338 0-11.384 2.128-15.141 6.382-3.758 4.255-5.635 10.004-5.635 17.246 0 7.289 1.809 13.06 5.431 17.314 3.621 4.255 8.532 6.382 14.734 6.382 4.571 0 8.645-1.176 12.222-3.53 3.575-2.353 6.155-5.522 7.74-9.506V52.235Z"
                                        fill="rgb(245, 245, 245)"></path>
                                    <path
                                        d="M108 0C95.66 0 86.015 9.294 77.284 21.1 65.284 5.821 55.25 0 43.24 0 18.76 0 0 31.862 0 65.586 0 86.69 10.21 100 27.31 100c12.308 0 21.16-5.803 36.897-33.31 0 0 6.56-11.584 11.072-19.564 1.582 2.553 3.243 5.3 4.997 8.253l7.38 12.414C102.03 91.848 110.038 100 124.551 100c16.659 0 25.931-13.492 25.931-35.034C150.483 29.656 131.301 0 108 0ZM52.207 59.241c-12.759 20-17.172 24.483-24.276 24.483-7.31 0-11.655-6.418-11.655-17.862 0-24.483 12.207-49.517 26.759-49.517 7.88 0 14.465 4.55 24.552 18.991-9.578 14.691-15.38 23.905-15.38 23.905Zm48.153-2.517-8.823-14.715a301.425 301.425 0 0 0-6.884-10.723c7.952-12.274 14.511-18.39 22.313-18.39 16.206 0 29.172 23.863 29.172 53.173 0 11.172-3.659 17.655-11.241 17.655-7.268 0-10.739-4.8-24.537-27Z"
                                        fill="#0180FA"></path>
                                    <path
                                        d="M145.586 35H130.66c3.452 8.746 5.478 19.482 5.478 31.069 0 11.172-3.659 17.655-11.241 17.655-1.407 0-2.672-.18-3.897-.631V99.82c1.143.122 2.324.18 3.552.18 16.659 0 25.931-13.492 25.931-35.034 0-10.737-1.774-20.95-4.897-29.966Z"
                                        fill="url(#b)"></path>
                                    <path
                                        d="M43.241 0c.254 0 .507.003.759.008v16.36c-.32-.015-.642-.023-.965-.023-14.183 0-26.139 23.782-26.736 47.655H.014C.59 30.87 19.143 0 43.24 0Z"
                                        fill="url(#c)"></path>
                                    <path
                                        d="M43.241 0c11.152 0 20.601 5.02 31.502 17.971 3.065 3.828 6.761 8.805 10.716 14.557l.017.025.025-.003a311.041 311.041 0 0 1 6.036 9.459l8.823 14.715c13.798 22.2 17.269 27 24.537 27H125v16.273c-.149.002-.298.003-.448.003-14.513 0-22.522-8.152-36.897-32.207l-7.38-12.414a596.368 596.368 0 0 0-2.294-3.834L78 51.5c-5.5-9-9-14.5-12-18.5l-.05.038c-9.18-12.63-15.47-16.693-22.916-16.693H43V0L43.241 0Z"
                                        fill="url(#d)"></path>
                                </g>
                            </svg>
                            
                            <div class="text-md md:text-lg font-semibold text-white">
                                Accounts Center
                            </div>

                            <div>
                                Manage your connected experiences and account settings across Meta technologies.
                            </div>

                            <div class="space-x-2">
                                <i class="fa-solid fa-user text-white"></i>
                                <span>
                                    Personal Details
                                </span>
                            </div>

                            <div class="space-x-1 flex flex-nowrap">
                                <i class="fa-solid fa-shield text-white"></i>
                                <span>
                                    Password and Security
                                </span>
                            </div>

                            <div class="space-x-2">
                                <i class="fa-solid fa-newspaper text-white"></i>
                                <span>
                                    Ad preferences
                                </span>
                            </div>

                        </div>

                        <!-- Tabs -->
                        <div 
                        @click="toggleSettingTab('edit-profile')"
                        class="p-4 border-l-2 focus:border-[#fafafa] 
                        hover:bg-[#121212] hover:border-[#363636] cursor-pointer">
                            Edit Profile
                        </div>

                        <div 
                            v-for="setting in unavailableSettingSections"
                            :key="setting"
                            class="p-4 hover:border-l-2 hover:bg-[#121212] 
                            hover:border-[#363636] cursor-not-allowed">
                            {{ setting }}
                        </div>
                        
                    </div>

                    <!-- Active Setting View -->
                    <div 
                        :class="{
                            'hidden': isMobileScreen && activeSettingTab !== 'edit-profile',
                        }"
                        class="sm:flex flex-col h-screen sm:h-full grow font-sans font-normal text-white p-5 space-y-5">

                        <!-- Title -->
                        <div class="md:text-2xl text-2xl text-gray-200">
                            Edit profile
                        </div>

                        <div class="flex flex-col space-y-4 sm:p-11 md:max-w-lg mx-auto sm:w-4/5">
                            
                            <!-- Profile Image -->
                            <div class="flex space-x-4 justify-between">
                                <img src="https://loremflickr.com/1024/1080/dog" alt="Profile Image" class="rounded-full w-10 h-10">
                               
                                <!-- Username & Change Profile Link -->
                                <div class="flex flex-col">
                                    <div class="text-md">
                                        memesgod840
                                    </div>
                                    <!-- TODO: Complete Photo Change Feature -->
                                    <!-- <div class="text-sm font-semibold text-[#0095f6] hover:text-white cursor-pointer">
                                        Change Profile Photo
                                    </div> -->
                                </div>

                                <!-- Left empty to Help center the above -->
                                <div>
                                </div>
                                
                            </div>

                            <!-- Profile Bio -->
                            <div class="flex space-x-4 justify-between">
                                <div class="text-md font-semibold">
                                    Bio
                                </div>
                               
                                <textarea 
                                    rows="1" 
                                    class="setting-bio-textarea max-w-xs">
                                </textarea>
                            </div>

                            <!-- User Gender -->
                            <div class="flex space-x-4 justify-between">
                                <div class="text-md font-semibold">
                                    Gender
                                </div>
                                <TheInput
                                    @click.prevent="toggleGenderModal"
                                    type="text"
                                    v-model="genderModal.selectedGender"
                                    class="block p-2.5 max-w-xs w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-black 
                                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-black" />
                            </div>
                            
                            <!-- Submit Button -->
                            <TheButton
							    :size="'sm'">
                                <span class="sm:text-md sm:font-semibold">
                                    Submit
                                </span>
						    </TheButton>
                        </div>
                        
                    </div>
				</div>
			</div>
		</section>
        <GenderModal 
            :title="genderModal.title"
            :is-toggled="genderModal.isToggled" 
            :items="genderModal.items"
            :modal-type="ModalType.Gender" 
            :modal-size="ModalSize.Medium"
            @on-modal-closed="toggleGenderModal" />
	</div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref, computed, watch } from 'vue'
import { 
    NavBarMain,
    SmallModal as GenderModal,
    TheInput
 } from '@/components'

 import {
	ScreenBreakpoint,
	ModalSize,
	ModalType,
    type Gender,
} from '@/common'

import TheButton from '@/components/basics/TheButton.vue'

const unavailableSettingSections = [
    'Language preferences',
    'Apps and Websites',
    'Email Notifications',
    'Push Notifications',
    'What you can see',
    'How others can interact with your content',
    'Supervision',
    'Help'
]

export default defineComponent({
    name: 'SettingView  ',
    setup() {

        // Screen size flags
        const screenWidth = ref<number>(window.innerWidth) // Current window width

        const activeSettingTab = ref<null | string>(null)
        const genderModal = ref({
            name: '',
            title: 'Gender',
            items: [
                {
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

        // Suggest a better name
        const toggleGenderModal = () => {
            genderModal.value.isToggled = !genderModal.value.isToggled
        }

        const toggleSettingTab = (setting: string) => {
            activeSettingTab.value = setting
            console.log('Setting: ', setting)
        }

        const isModalToggled = computed(() => {
            return genderModal.value.isToggled 
        })
        
        const isMobileScreen = computed(() => {
            console.log("Screen width: ", screenWidth.value)
            return screenWidth.value <= ScreenBreakpoint.Medium
        })

        onMounted(() => {
            screenWidth.value = window.innerWidth // Set initial value to current screen size
            // console.log('SettingView mounted')
        })

        return {
            genderModal,
            toggleGenderModal,
            toggleSettingTab,
            activeSettingTab,
            unavailableSettingSections,
            isModalToggled,
            isMobileScreen,
            ModalSize,
            ModalType,
            screenWidth
        }
    },
    components: {
    NavBarMain,
    GenderModal,
    TheInput,
    TheButton
},
})
</script>

<style scoped>
.setting-bio-textarea {
    background: transparent;
    border: 1px solid;
    border-radius: 3px;
    box-sizing: border-box;
    flex: 0 1 355px;
    font-size: 16px;
    height: 60px;
    padding: 6px 10px;
    resize: vertical;
}
</style>