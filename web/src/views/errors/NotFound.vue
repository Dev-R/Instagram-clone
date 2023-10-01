<template>
    <div class="bg-slate-1000">
        <section 
            class="container max-w-full mx-auto text-center">
            <div class="grid grid-cols-12">
                <!-- Left bar: Navigation -->
                <div 
                    class="xl:col-span-2 col-span-1 bg-black 
                    md:block hidden space-y-12 h-screen 
                    sticky top-0 border-r border-gray-900">
                    <NavBarMain
                        />
                </div>

                <!-- Center: Error Message -->
                <div 
                    class="xl:col-span-10 md:col-span-11 
                    col-span-12 bg-black h-screen">
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
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
// TODO: Remove NavBarMain
import {
    NavBarMain
} from '@/components'
</script>