import { 
    useRouter 
} from 'vue-router'

import {
    defineStore
} from 'pinia'

import jwt_decode from 'jwt-decode'

import {
    StorageService
} from '@/common/storage'

import {
    APIService
} from '@/common/api'

import {
    AUTH_PREFIX
} from './prefix'

import type {
    ChangePasswordInput,
    EmailOnlyInput,
    LoginInput,
    RefreshTokenInput,
    RegisterUserInput,
    ResetPasswordInput,
    DetailResponse,
    LoginResponse,
    TokenRefresh,
    TokenDecoded
} from '@/common/models/auth.model'

const BASE_REGISTRATION = `${ AUTH_PREFIX }/registration`
const BASE_PASSWORD = `${ AUTH_PREFIX }/password`

const router = useRouter()

/**
 * Authentication store
 */
export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: StorageService.getStorage('accessToken'),
        refreshToken: StorageService.getStorage('refreshToken'),
        isAuthenticated: false,
        username: undefined as string | undefined,
        userId: undefined as number | undefined,
        email: undefined as string | undefined,
        customerId: undefined as number | undefined,
        vendorId: undefined as number | undefined
    }),
    getters: {
    },
    actions: {
        /**
         * Login to system
         * 
         * @param payload - payload
         * @param payload.username - user's email or username
         * @param payload.password - user's password
         * @returns Token
         */
        login(payload: LoginInput): Promise<LoginResponse> {
            return new Promise((resolve, reject) => {
                APIService.post(`${ AUTH_PREFIX }/login`, payload)
                    .then(({ data }) => {
                        resolve(data)
                        
                        // Save tokens
                        StorageService.saveStorage('accessToken', data.accessToken)
                        StorageService.saveStorage('refreshToken', data.refreshToken)
                        this.accessToken = data.accessToken
                        this.refreshToken = data.refreshToken

                        // Actions after authenticated
                        this.doAfterAuthenticated()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        /**
         * Register user
         * 
         * @param payload - payload
         * @param payload.username - user's email or username
         * @param payload.firstName - user's first name
         * @param payload.lastName - user's last name
         * @param payload.phoneNo - user's phone no.
         * @param payload.dateOfBirth - user's date of birth
         * @returns Detail message
         */
         registerUser(payload: RegisterUserInput): Promise<DetailResponse> {
            return new Promise((resolve, reject) => {
                APIService.post(`${ BASE_REGISTRATION }/user`, payload)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        /**
         * Change account password
         * 
         * @param payload - payload
         * @param payload.oldPassword - old password
         * @param payload.newPassword1 - new password
         * @param payload.newPassword2 - confirm new password
         * @returns Detail message
         */
        changePassword(payload: ChangePasswordInput): Promise<DetailResponse> {
            return new Promise((resolve, reject) => {
                APIService.post(`${ BASE_PASSWORD }/change`, payload)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        /**
         * Request reset account password
         * 
         * @param payload - payload
         * @param payload.email - user's email
         * @returns Detail message
         */
        requestReset(payload: EmailOnlyInput): Promise<DetailResponse> {
            return new Promise((resolve, reject) => {
                APIService.post(`${ BASE_PASSWORD }/reset`, payload)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        /**
         * Reset account password
         * 
         * @param payload - payload
         * @param payload.newPassword1 - new password
         * @param payload.newPassword2 - confirm new password
         * @param payload.uid - received uid
         * @param payload.token - received token
         * @returns Detail message
         */
        resetPassword(payload: ResetPasswordInput): Promise<DetailResponse> {
            return new Promise((resolve, reject) => {
                APIService.post(`${ BASE_PASSWORD }/reset/confirm`, payload)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        /**
         * Verify access token
         * 
         * @returns Detail message
         */
        verifyToken(): Promise<object> {
            const payload = { token: this.accessToken }
            return new Promise((resolve, reject) => {
                APIService.post(`${ AUTH_PREFIX }/token/verify`, payload)
                    .then(({ data }) => {
                        resolve(data)
                        
                        // Actions after authenticated
                        this.doAfterAuthenticated()
                    })
                    .catch(err => {
                        reject(err)
                        
                        // Reset storage and state
                        this.logout()
                    })
            })
        },
        /**
         * Refresh access token
         * 
         * @param payload - payload
         * @param payload.refresh - refresh token
         * @returns New access and refresh token
         */
        refreshTokens(payload: RefreshTokenInput): Promise<TokenRefresh> {
            return new Promise((resolve, reject) => {
                APIService.post(`${ AUTH_PREFIX }/token/refresh`, payload)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                        
                        // Reset storage and state
                        this.logout()
                    })
            })
        },
        /**
         * Logout from system
         * 
         * @returns Navigate to login page
         */
        logout() {
            // Reset storage and state
            StorageService.clearStorage()
            this.$reset()

            // Navigate
            return router.push({ path: '/accounts/login' })
        },
        /**
         * Actions after successful login / verify token
         */
        doAfterAuthenticated() {
            // Flag authenticated
            this.isAuthenticated = true
            
            // Decode JWT and assign
            const decoded = jwt_decode(this.accessToken) as TokenDecoded
            this.username = decoded.username
            this.userId = decoded.id
            this.email = decoded.email
        }
    }
})