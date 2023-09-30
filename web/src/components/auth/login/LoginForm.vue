<template>
	<div class="flex flex-row m-auto space-x-1">
		<MobileWelcomeScreen 
			:is-mobile-login="isMobileLogin"
			@mobile-login="triggerMobileLogin"/>
			
		<div 
			:class="isMobileLogin ? '' : 'hidden'"
			class="sm:flex sm:flex-col space-y-3 m-8">
			<form 
				class="flex flex-col sm:w-80 w-screen border rounded-sm p-8 md:h-fit"
				@submit.prevent>
				<!-- Icon -->
				<div class="self-center mb-2">
					<img src="@/assets/images/mobile-small-icon.png" />
				</div>

				<!-- Input: Email -->
				<div class="mb-2">
					<TheInput
						v-model="loginForm.username" 
						placeholder="Phone number, username, or email" 
						:class="{
							'border-red-400': v$.username.$dirty && v$.username.$invalid 
						}"
						@blur="v$.username.$touch" />

					<p
						v-for="error of v$.username.$errors"
						:key="error.$uid"
						class="mt-2 text-xs text-red-600 dark:text-red-500">
						{{ error.$message }}
					</p>
				</div>

				<!-- Input: Password -->
				<div class="mb-5">
					<TheInput
						v-model="loginForm.password"
						type="password" 
						placeholder="Password"
						:class="{
							'border-red-400': v$.password.$dirty && v$.password.$invalid 
						}"
						@blur="v$.password.$touch" />
			
					<p
						v-for="error of v$.password.$errors"
						:key="error.$uid"
						class="mt-2 text-xs text-red-600 dark:text-red-500">
						{{ error.$message }}
					</p>
				</div>

				<!-- Button: Login -->
				<TheButton
					:size="'sm'"
					:disabled="isLoading || v$.$invalid"
					@click="login()">
					<i  
						v-if="isLoading"
						class="fa-sharp fa-solid fa-spinner animate-spin">
					</i>

					<div v-else>
						Log in
					</div>
				</TheButton>
			
				<!-- OR Dialog -->
				<fieldset class="border-t border-slate-300 m-4">
					<legend class="mx-auto px-4 text-gray-500 text-xs font-sans">
						OR
					</legend>
				</fieldset>

				<!-- Link: Reset password -->
				<div class="mt-3 self-center">
					<router-link 
						to="reset"
						class=" font-sans text-blue-900 text-sm text-center">
						Forgot password?
					</router-link>
				</div>
			</form>

			<LoginFooter />
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	ref,
    computed
} from 'vue'

import {
    useToast
} from 'vue-toastification'

import useVuelidate from '@vuelidate/core'

import {
    helpers,
    minLength,
    required
} from '@vuelidate/validators'

import {
    TheInput,
    TheButton,
    LoginFooter,
	MobileWelcomeScreen
} from '@/components'

import type {
    LoginInput
} from '@/common'

// Form
const loginForm = ref<LoginInput>({
    username: null,
    password: null
})

// Checkers
const isMobileLogin = ref<boolean>(false)
const isLoading = ref<boolean>(false)

//  Computed
const validation = computed(() => ({
    username: {
        required: helpers.withMessage(
            'Username is required',
            required
        )
    },
    password: {
        required: helpers.withMessage(
            'Password is required',
            required
        ),
        minLength: helpers.withMessage(
            'Min length is 8 characters',
            minLength(8)
        )
    }
}))


// Services
const toast = useToast()
const v$ = useVuelidate(validation, loginForm.value)



const login = () => {
    isLoading.value = true
    setTimeout(() => {
        // TODO - Login logic
        // Success toastr
        toast.success('Success. Redirecting...')
        isLoading.value = false
    }, 1000)
}


// A simple and a lazy solution to display login form in mobile screens
const triggerMobileLogin = () => {
    isMobileLogin.value = !isMobileLogin.value
}

</script>