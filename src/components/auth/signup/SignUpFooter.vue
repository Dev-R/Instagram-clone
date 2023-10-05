<template>
    <!-- Prompt -->
    <p class="mt-5 font-sans text-gray-500 text-xs text-center">
        By signing up, you agree to our
        <span class="text-blue-600">Terms</span>
        , 
        <span class="text-blue-600">Privacy Policy</span>
        and
        <span class="text-blue-600">Cookies Policy</span>
        .
    </p>

    <!-- OR Dialog -->
    <fieldset class="border-t border-slate-300 m-4">
        <legend class="mx-auto px-4 text-gray-500 text-xs font-sans">
            OR
        </legend>
    </fieldset>

    <router-link 
        class="text-sm font-semibold font-sans sm:hover:text-gray-400 mx-auto"
        to="login">
        Sign in
    </router-link> 
</template>