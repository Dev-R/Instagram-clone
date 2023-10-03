<template>
    <div    
        :class="isToggledClass"
        class="flex sm:h-screen">
        <div class="md:flex md:flex-row md:p-0 md:place-self-center md:max-w-4xl m-auto items-center
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
    <GenderModal 
        :title="genderModal.title"
        :is-toggled="genderModal.isToggled" 
        :items="genderModal.items"
        :modal-type="ModalName.GENDER" 
        :modal-size="ModalSize.Medium"
        @on-modal-closed="toggleGenderModal" />
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    onMounted
} from 'vue'

import {
    SmallModal as GenderModal,
    SettingNavigator,
    SettingForm
} from '@/components'

import {
    ScreenBreakpoint,
    ModalSize,
    ModalName,
    type User,
} from '@/common'

import { 
    useModalManagerStore 
} from '@/stores'

import {
    SampleGenerator
} from '@/data'

const user = ref<User>(SampleGenerator.generateRandomUser())
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
    ],
    selectedGender: 'Female',
    isToggled: false
})

const activeSettingTab = ref<null| string>(null)
const screenWidth = ref<number>(window.innerWidth) // Current window width
const modalStoreManager = useModalManagerStore()

const toggleGenderModal = () => {
    genderModal.value.isToggled = !genderModal.value.isToggled
    modalStoreManager.toggleModal(ModalName.GENDER)
}

const isMobileScreen = computed(() => {
    console.log("Screen width: ", screenWidth.value)
    return screenWidth.value <= ScreenBreakpoint.Medium
})

const isToggledClass = computed(() => {
    return genderModal.value.isToggled ? "lights-off" : ""
})

onMounted(() => {
    screenWidth.value = window.innerWidth 
})
</script>