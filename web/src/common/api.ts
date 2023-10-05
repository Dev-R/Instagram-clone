import { useAuthStore } from '@/stores'
import axios from 'axios'
import { HttpStatusCode } from './http.status'

const EXCEPTION_ENDPOINT = [
    'auth/password/change/'
]
const NO_TOKEN_ENDPOINT = [
    'auth/'
]
const JSON_TYPE_METHOD = [
    'post', 'patch', 'put'
]

/**
 * API common service
 */
export const APIService = {
    /**
     * Init service
     */
    init() {
        // URL configs
        axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`

        // Request interceptor
        axios.interceptors.request.use(
            config => {
                // Get auth store
                const authStore = useAuthStore()
                
                if (config.url && authStore.accessToken) {
                    if (EXCEPTION_ENDPOINT.includes(config.url) ||
                        !NO_TOKEN_ENDPOINT.includes(config.url)) {
                        // Append bearer token
                        config.headers!['Authorization'] = 'Bearer ' + authStore.accessToken
                    }
                }
                
                if (config.method && JSON_TYPE_METHOD.includes(config.method)) {
                    // Append content type if post, put, patch
                    config.headers!['Content-Type'] = 'application/json';
                }
                
                return config
            },
            error => {
                Promise.reject(error)
        })

        // Response interceptors for error
        axios.interceptors.response.use(undefined, (error) => {
            const { response } = error
            if (!response) {
                // Network
                console.error(error)
                return
            }
    
            if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(response.status)) {
                // if 401 or 403 response returned from api
                // example: https://jasonwatmore.com/post/2020/10/06/vue-3-facebook-login-tutorial-example#error-interceptor-js
            }
            
            // const errorMessage = response.data?.message || response.statusText // uncomment this to show shorter error
            const errorMessage = response // show all
            console.error('ERROR:', JSON.stringify(errorMessage))

            if (response.data) {
                // alert(response.data.detail)
                // console.log('Interceptor detail: ', response.data.detail)
            }

            return Promise.reject(response)
        })
    },
    /**
     * GET request
     * 
     * @param endpoint - API endpoint
     * @param query - query string if needed
     * 
     * @return axios.get
     */
    async get (endpoint: string, query: string | null = null) {
        if (query !== null) {
            endpoint = `${endpoint}/?${query}`
        } else {
            endpoint = `${endpoint}/`
        }
        return await axios.get(`${endpoint}`).catch(error => {
            throw error
        })
    },
    /**
     * POST request
     * 
     * @param endpoint - API endpoint
     * @param payload - request payload
     * 
     * @return axios.post
     */
    async post (endpoint: string, payload: object) {
        return await axios.post(`${endpoint}/`, payload).catch(error => {
            // console.log(error)
            throw error
        })
    },
    /**
     * PATCH request
     * 
     * @param endpoint - API endpoint
     * @param payload - request payload
     * 
     * @return axios.patch
     */
    async patch (endpoint: string, payload: object) {
        return await axios.patch(`${endpoint}/`, payload).catch(error => {
            // console.log(error)
            throw error
        })
    },
    /**
     * DELETE request
     * 
     * @param endpoint - API endpoint
     * 
     * @return axios.delete
     */
    async destroy (endpoint: string) {
        return await axios.delete(`${endpoint}/`).catch(error => {
            // console.log(error)
            throw error
        })
    },
}