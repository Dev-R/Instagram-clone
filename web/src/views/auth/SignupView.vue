<template>
    <form 
        @submit.prevent
        class="flex flex-col sm:w-80 w-full border rounded-sm p-8 m-auto">

        <!-- Icon -->
        <div class="self-center mb-2">
            <img src="https://i.ibb.co/wSTx6ft/icon.png"/>
        </div>

        <!-- Prompt -->
        <div class="mb-2 font-sans text-md text-gray-500 font-semibold text-center self-center">
            Sign up to see photos and videos from your friends.
        </div>
        
        <!-- Input A -->
        <div class="mb-2">
            <TheInput
                type="email"
                placeholder="Email" 
                v-model="signupForm.email" 
                :class="{
                    'border-red-400': v$.email.$dirty &&
                                        v$.email.$invalid 
                    
                }"
                @blur="v$.email.$touch" />

            <p
                v-for="error of v$.email.$errors"
                :key="error.$uid"
                class="mt-2 text-xs text-red-600 dark:text-red-500">
                {{ error.$message }}
            </p>
        </div>

        <!-- Input B -->
        <div class="mb-2">
            <TheInput
                placeholder="Full Name" 
                v-model="signupForm.fullName" 
                :class="{
                    'border-red-400': v$.fullName.$dirty &&
                                        v$.fullName.$invalid 
                    
                }"
                @blur="v$.fullName.$touch" />

            <p
                v-for="error of v$.fullName.$errors"
                :key="error.$uid"
                class="mt-2 text-xs text-red-600 dark:text-red-500">
                {{ error.$message }}
            </p>
        </div>

        <!-- Input C -->
        <div class="mb-2">
            <TheInput
                placeholder="Username" 
                v-model="signupForm.username" 
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


        <!-- Input D -->
        <div class="mb-5">
            <TheInput
                type="password"
                placeholder="Password" 
                v-model="signupForm.password"
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
            @click="signup()"
            :size="'sm'"
            :disabled="isLoading || v$.$invalid">
            <i  
                v-if="isLoading"
                class="fa-sharp fa-solid fa-spinner animate-spin">
            </i>

            <div v-else>
                Sign Up
            </div>

        </TheButton>

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
            class="text-sm font-semibold font-sans hover:text-gray-400 mx-auto"
            to="login">
            Sign in
        </router-link> 

    </form>
</template>

<script lang="ts">
import { onMounted, defineComponent, computed, ref } from 'vue'

import useVuelidate from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'

import {
    TheInput,
    TheButton
} from '@/components'
import { useToast } from 'vue-toastification'

export default defineComponent({
    name: 'Signup',
    setup() {
        // Form
        const signupForm = ref({
            email: null,
            fullName: null,
            username: null,
            password: null
        })
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
        const v$ = useVuelidate(validation, signupForm.value)

        // Services
        const toast = useToast()

        // Checkers
        const isLoading = ref<boolean>(false)


        const signup = () => {
            isLoading.value = true
            setTimeout(() => {
                // Success toastr
                toast.success('Success. Redirecting...')
                isLoading.value = false
            }, 1000)
        }

        onMounted(() => {
            // console.log('Mounted signup')
        })

        return {
            v$,
            signup,
            signupForm,
            isLoading
        }
    },
    components: {
        TheInput,
        TheButton
    }
})
</script>