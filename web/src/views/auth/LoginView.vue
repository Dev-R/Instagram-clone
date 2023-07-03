<template>
	<div class="flex flex-row m-auto space-x-1">
		<div class="relative hidden md:block">
			<img src="https://i.ibb.co/FX9V57c/img-c.png" />
			<transition name="fade">
				<img
					id="dynamic"
					:key="currentImage"
					class="absolute top-6 right-14"
					:src="currentImage" />
			</transition>
		</div>

		<!-- Mobile Welcome Screen -->
		<div 
			v-show="!isMobileLogin"
			class="block sm:hidden">
			<!-- Icon -->
			<img 
				class="mx-auto"
				src="https://i.ibb.co/wSTx6ft/icon.png" />
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
						@click="triggerMobileLogin">
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

		<!-- Desktop Welcome Screen -->
		<div 
			:class="isMobileLogin ? '' : 'hidden'"
			class="sm:flex sm:flex-col space-y-3 m-8">
			<form 
				class="flex flex-col sm:w-80 w-screen border rounded-sm p-8 md:h-fit"
				@submit.prevent>
				<!-- Icon -->
				<div class="self-center mb-2">
					<img src="https://i.ibb.co/wSTx6ft/icon.png" />
				</div>

				<!-- Input A -->
				<div class="mb-2">
					<TheInput
						v-model="loginForm.username" 
						placeholder="Phone number, username, or email" 
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


				<!-- Input B -->
				<div class="mb-5">
					<TheInput
						v-model="loginForm.password"
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

				<!-- Button A -->
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

				<!-- Link A -->
				<div class="mt-3 self-center">
					<router-link 
						to="reset"
						class=" font-sans text-blue-900 text-sm text-center">
						Forgot password?
					</router-link>
				</div>
			</form>
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
						src="https://i.ibb.co/sy5GWt1/img-a.png" />
					<img 
						class="w-32"
						src="https://i.ibb.co/jvm3Yg1/img-b.png" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed, ref } from 'vue'

import { useToast } from 'vue-toastification'
import useVuelidate from '@vuelidate/core'
import { 
    helpers, 
    minLength, 
    required 
} from '@vuelidate/validators'

import {
    TheInput,
    TheButton
} from '@/components'

import type {
    LoginInput
} from '@/common'

export default defineComponent({
    name: 'Login',
    setup() {
        // Form
        const loginForm = ref<LoginInput>({
            username: null,
            password: null
        })
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

        // Images
        const images = [
            'https://i.ibb.co/7p4t6KN/img-b.png',
            'https://i.ibb.co/MDqTXCq/screenshot2.png',
            'https://i.ibb.co/LtW8Km5/img-d.png',
            'https://i.ibb.co/LQjhgX6/screenshot4.png',
        ]

        // Services
        const toast = useToast()
        const v$ = useVuelidate(validation, loginForm.value)

        // Checkers
        const isLoading = ref<boolean>(false)
        const isMobileLogin = ref<boolean>(false)
        let currentImageIndex = ref<number>(0)


        const login = () => {
            isLoading.value = true
            setTimeout(() => {
                // Success toastr
                toast.success('Success. Redirecting...')
                isLoading.value = false
            }, 1000)
        }

        const changeImage = () => {
            currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
        }

        // A simple and a lazy solution to display login form in mobile screens
        const triggerMobileLogin = () => {
            isMobileLogin.value = !isMobileLogin.value
        }

        const currentImage = computed(() => images[currentImageIndex.value])
        

        onMounted(() => {
            // console.log('Mounted Login')
            setInterval(changeImage, 5000); // Change image every 5 seconds
        })

        return {
            v$,
            login,
            triggerMobileLogin,
            loginForm,
            currentImage,
            isLoading,
            isMobileLogin
        }
    },
    components: {
        TheInput,
        TheButton
    }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>