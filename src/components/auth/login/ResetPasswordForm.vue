<template>
	<div class="flex flex-col max-w-sm w-full border rounded-sm m-auto">
		<form 
			class="flex flex-col p-12 space-y-4"
			@submit.prevent>
			<!-- Icon -->
			<div class="self-center">
				<img src="https://i.ibb.co/svsRJ1w/icon-1.png" />
			</div>

			<!-- Prompt -->
			<div class="font-sans text-md font-semibold text-black self-center">
				Trouble logging in?
			</div>

			<div class="font-sans text-sm font-light text-black">
				Enter your email, phone, or username and we'll send you a link to get back into your account.
			</div>

			<!-- Input: Username -->
			<div>
				<TheInput
					v-model="resetForm.username" 
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
					Send login link
				</div>
			</TheButton>

			<!-- Link: Help -->
			<div class="self-center">
				<router-link 
					to="reset"
					class="font-sans text-blue-900 text-xs text-center">
					Can't reset your password?
				</router-link>
			</div>


			<!-- OR Dialog -->
			<fieldset class="border-t border-slate-300">
				<legend class="mx-auto px-4 text-gray-500 text-xs font-sans">
					OR
				</legend>
			</fieldset>

			<router-link 
				class="text-sm font-semibold font-sans sm:hover:text-gray-400 mx-auto "
				to="signup">
				Create new account
			</router-link>
		</form>

		<!-- Footer -->
		<div class="pt-2 pb-2 w-full text-center self-center border">
			<router-link 
				class="text-sm font-semibold font-sans sm:hover:text-gray-400"
				to="login">
				Back to login
			</router-link> 
		</div>
	</div>
</template>

<script setup lang="ts">
import {
    computed,
    ref
} from 'vue'

import useVuelidate from '@vuelidate/core'

import {
    helpers,
    required
} from '@vuelidate/validators'

import {
    useToast
} from 'vue-toastification'

import {
    TheInput,
    TheButton
} from '@/components'

// Form
const resetForm = ref({
    username: null,
})
const validation = computed(() => ({
    username: {
        required: helpers.withMessage(
            'Username is required',
            required
        )
    }
}))

// Services
const toast = useToast()
const v$ = useVuelidate(validation, resetForm.value)

// Checkers
const isLoading = ref < boolean > (false)

const login = () => {
    isLoading.value = true
    setTimeout(() => {
        // Success toaster
        // TODO: Replace with actual login logic
        toast.success('Success. Redirecting...')
        isLoading.value = false
    }, 1000)
}
</script>