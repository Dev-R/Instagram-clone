<template>
    <div class="p-5 border text-center">
        <span class="font-sans text-sm">
            Don't have an account?
        </span>
        <router-link
            to="signup"
            class="font-sans font-semibold text-sm text-sky-500">
            Sign up
        </router-link>
    </div>

    <div class="px-4 text-center space-y-3 hidden sm:block">
        <span class="font-sans text-sm">
            Get the app.
        </span>
        <div class="flex flex-row space-x-4 self-center">
            <img 
                class="w-32"
                src="@/assets/images/google-store.png" />
            <img 
                class="w-32"
                src="@/assets/images/microsoft-store.png" />
        </div>
    </div>
</template>