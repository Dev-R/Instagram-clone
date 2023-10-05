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

		<!-- Input:First Name -->
		<div class="mb-2">
			<TheInput
				v-model="signupForm.firstName" 
				placeholder="First name" 
				:class="{
					'border-red-400': v$.firstName.$dirty && v$.firstName.$invalid 
                }"
				@blur="v$.firstName.$touch" />

			<p
				v-for="error of v$.firstName.$errors"
				:key="error.$uid"
				class="mt-2 text-xs text-red-600 dark:text-red-500">
				{{ error.$message }}
			</p>
		</div>

		<!-- Input:Last Name -->
		<div class="mb-2">
			<TheInput
				v-model="signupForm.lastName" 
				placeholder="Last name" 
				:class="{
					'border-red-400': v$.lastName.$dirty && v$.lastName.$invalid 
				}"
				@blur="v$.lastName.$touch" />

			<p
				v-for="error of v$.lastName.$errors"
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

import { 
	useRouter 
} from 'vue-router'

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
    SignUpFooter,
	SignUpHeader
} from '@/components'

// Form
const signupForm = ref({
    email: null,
    firstName: null,
	lastName: null,
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
    firstName: {
        required: helpers.withMessage(
            'Please enter your first name',
            required
        )
    },
	lastName: {
        required: helpers.withMessage(
            'Please enter your last name',
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
const router = useRouter()
const v$ = useVuelidate(validation, signupForm.value)

// Methods
const signup = () => {
    isLoading.value = true
    setTimeout(() => {
        // Success toastr
        // TODO: Replace with actual signup logic
        toast.success('Success. Redirecting...')
		router.push({ name: 'home' })
        isLoading.value = false
    }, 1000)
}
</script>