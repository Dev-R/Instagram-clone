<template>
    <div 
        v-show="!isMobileLogin"
        class="block sm:hidden">
        <!-- Icon -->
        <img 
            class="mx-auto"
            src="@/assets/images/mobile-small-icon.png" />
        <div class="flex flex-col">
            <div class="p-5 font-sans text-center text-2xl sm:w-72 w-11/12"> 
                Sign up to see 
                <span class="text-rose-500">
                    photos
                </span>
                and
                <span class="text-rose-600">
                    videos
                </span>
                from your friends.
            </div>
            <div class="text-center">
                <span
                    class="font-sans font-semibold text-sm text-sky-500 cursor-pointer"
                    @click="$emit('mobileLogin')">
                    Login
                </span>
                or
                <router-link
                    to="signup"
                    class="font-sans font-semibold text-sm text-sky-500">
                    Sign up
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    isMobileLogin: Boolean
})

defineEmits([
    'mobileLogin'
])
</script>