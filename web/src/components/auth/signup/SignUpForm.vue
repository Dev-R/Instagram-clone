<template>
	<form 
		class="flex flex-col sm:w-80 w-full border rounded-sm p-8 m-auto"
		@submit.prevent>

        <SignUpHeader />
		<!-- Input: Email -->
		<div class="mb-2">
			<TheInput
				v-model="signupForm.email"
				type="email" 
				placeholder="Email" 
				:class="{
					'border-red-400': v$.email.$dirty && v$.email.$invalid 
                }"
				@blur="v$.email.$touch" />

			<p
				v-for="error of v$.email.$errors"
				:key="error.$uid"
				class="mt-2 text-xs text-red-600 dark:text-red-500">
				{{ error.$message }}
			</p>
		</div>

		<!-- Input: Full Name -->
		<div class="mb-2">
			<TheInput
				v-model="signupForm.fullName" 
				placeholder="Full Name" 
				:class="{
					'border-red-400': v$.fullName.$dirty && v$.fullName.$invalid 
                }"
				@blur="v$.fullName.$touch" />

			<p
				v-for="error of v$.fullName.$errors"
				:key="error.$uid"
				class="mt-2 text-xs text-red-600 dark:text-red-500">
				{{ error.$message }}
			</p>
		</div>

		<!-- Input: Username -->
		<div class="mb-2">
			<TheInput
				v-model="signupForm.username" 
				placeholder="Username" 
				:class="{
					'border-red-400': v$.username.$dirty &&
						v$.username.$invalid 
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
				v-model="signupForm.password"
				type="password" 
				placeholder="Password"
				:class="{
					'border-red-400': v$.password.$dirty &&
						v$.password.$invalid 
                }"
				@blur="v$.password.$touch" />
    
			<p
				v-for="error of v$.password.$errors"
				:key="error.$uid"
				class="mt-2 text-xs text-red-600 dark:text-red-500">
				{{ error.$message }}
			</p>
		</div>

		<!-- Button: Sign Up -->
		<TheButton
			:size="'sm'"
			:disabled="isLoading || v$.$invalid"
			@click="signup()">
			<i  
				v-if="isLoading"
				class="fa-sharp fa-solid fa-spinner animate-spin">
			</i>

			<div v-else>
				Sign Up
			</div>
		</TheButton>

		<SignUpFooter />
	</form>
</template>

<script setup lang="ts">
import {
    ref,
    computed
} from 'vue'

import useVuelidate from '@vuelidate/core'
import {
    email,
    helpers,
    minLength,
    required
} from '@vuelidate/validators'

import {
    useToast
} from 'vue-toastification'

import {
    TheInput,
    TheButton,
    SignUpFooter
} from '@/components'

// Form
const signupForm = ref({
    email: null,
    fullName: null,
    username: null,
    password: null
})

// Checkers
const isLoading = ref<boolean>(false)

const validation = computed(() => ({
    email: {
        required: helpers.withMessage(
            'Email is required',
            required
        ),
        email: helpers.withMessage(
            'Valid email is required',
            email
        )
    },
    fullName: {
        required: helpers.withMessage(
            'Please enter your full name',
            required
        )
    },
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
const v$ = useVuelidate(validation, signupForm.value)

// Methods
const signup = () => {
    isLoading.value = true
    setTimeout(() => {
        // Success toastr
        // TODO: Replace with actual signup logic
        toast.success('Success. Redirecting...')
        isLoading.value = false
    }, 1000)
}
</script>