<template>
    <div 
        @click="goToUserProfile(cardItem.userName)"
        class="flex flex-col space-y-4 flex-nowrap top-0 max-w-sm">

        <!-- A: Current User Data -->
        <div class="rounded-lg flex items-center space-x-2 cursor-pointer">

            <div class="flex-inital">
                <img 
                    :src="cardItem.profilePictureUrl" 
                    class="w-11 h-11 rounded-full">
            </div>

            <div class="flex-inital ">
                <span class="font-sans text-sm font-semibold text-white">
                    {{ cardItem.userName }}
                </span>
            </div>

            <div class="flex-inital grow grid">
                <span class="font-sans text-xs text-sky-500 justify-self-end">
                    Switch
                </span>
            </div>

        </div>

        <!-- B.1 -->
        <div class="rounded-lg flex items-center space-x-2">

            <div class="flex-inital">
                <span class="font-sans text-sm font-semibold text-gray-400">
                    Suggestions for you
                </span>
            </div>
            <div class="flex-inital grow grid">
                <span class="font-sans text-xs text-white justify-self-end">
                    See All
                </span>
            </div>

        </div>

        <!-- B.2: Suggessted Users Data -->
        <div 
            v-for="(suggest, index) of cardItem.suggested"
            :key="index"
            @click="goToUserProfile(suggest.userName)"
            class="flex flex-col">

            <!-- TODO: Refactor into Suggested Card -->
            <div class="rounded-lg flex items-center space-x-2 w-80 h-12 cursor-pointer">

                <div class="flex-inital">
                    <img 
                        :src="suggest.profilePictureUrl" 
                        class="w-8 h-8 rounded-full">
                </div>

                <div class="flex flex-inital flex-col">

                    <span class="font-sans text-sm font-semibold text-white self-start">
                        {{ suggest.userName }}
                    </span>
                    <span class="font-sans text-xs font-semibold text-gray-400 self-start">
                        Followed by {{ suggest.followedBy }}
                    </span>

                </div>

                <div class="flex-inital grow grid">
                    <span class="font-sans text-xs text-sky-500 justify-self-end">
                        Follow
                    </span>
                </div>

            </div>

        </div>
        <!-- C -->
        <div class="flex list-disc space-x-4 font-sans text-xs font-semibold text-gray-500 self-start flex-wrap">
            <li class="list-none">About</li>
            <li>Help</li>
            <li>Press</li>
            <li>API</li>
            <li>Jobs</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Locations</li>
            <li>Language</li>
        </div>

        <!-- D -->
        <div class="flex font-sans text-xs font-semibold text-gray-500 self-start">
            <span>
                © 2023 PHOTOFLOW
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    goToUserProfile, 
    type SuggestionCard 
} from '@/common'

defineProps({
    cardItem: {
        type: Object as () => SuggestionCard,
        required: true
    }
})
</script>