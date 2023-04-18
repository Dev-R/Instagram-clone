import type { PhotoModalImage } from '@/common/models/profile.model'
import { defineStore } from 'pinia'

/**
 * Photo store
 */
export const usePhotoStore = defineStore('photo', {
    state: () => ({
        previewImage: null as PhotoModalImage | null,
    }),
    getters: { 
        getPreviewImage: (state) => {
            return state.previewImage
        }
    },
    actions: {
    }
})