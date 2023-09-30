<template>
    <div 
        v-show="isMobileScreen && activeSettingTab === 'edit-profile'"
        class="sm:flex flex-col h-screen sm:h-full grow font-sans font-normal text-white p-5 space-y-5">

        <!-- Title -->
        <div class="md:text-2xl text-2xl text-gray-200">
            Edit profile
        </div>

        <div class="flex flex-col space-y-4 sm:p-11 md:max-w-lg mx-auto sm:w-4/5">
            <!-- Profile Image -->
            <div class="flex space-x-4 justify-between">
                <img 
                    :src="user.profilePictureUrl" 
                    alt="Profile Image"
                    class="rounded-full w-10 h-10" />
        
                <!-- Username & Change Profile Link -->
                <div class="flex flex-col">
                    <div class="text-md">
                        {{ user.userName }}
                    </div>
                    <!-- TODO: Complete Photo Change Feature -->
                    <!-- <div class="text-sm font-semibold text-[#0095f6] hover:text-white cursor-pointer">
                        Change Profile Photo
                    </div> -->
                </div>

                <div></div>
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
                    v-model="user.gender"
                    type="text"
                    class="block p-2.5 max-w-xs w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-black 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-black"
                    @click.prevent="$emit('gender-modal')" />
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
</template>

<script setup lang="ts">
import type {
    PropType
} from 'vue'

import {
    TheButton,
    TheInput
} from '@/components'

import type { 
    User 
} from '@/common'

defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    },
    isMobileScreen: {
        type: Boolean,
        required: true
    },
    activeSettingTab: {
        type: String as () => string | null
    }
})
defineEmits(['gender-modal'])
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