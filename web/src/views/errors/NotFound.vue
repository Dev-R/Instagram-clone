<template>
    <div class="w-full bg-black h-screen">
        <div 
            class="font-sans text-white text-center 
            pt-10 space-y-8 p-5">

            <p class="text-2xl font-semibold">
                Sorry, this page isn't available.            
            </p>
            <p>
                The link you followed may be broken, or the page may have been removed. 
                <router-link to="/">
                    Go back to PhotoFlow.
                </router-link>
            </p>
            
        </div>
    </div>
</template>

<script setup lang="ts">
// TODO: Remove SideNavBar
import {
    SideNavBar
} from '@/components'
</script>