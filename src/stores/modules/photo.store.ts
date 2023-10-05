import {
    defineStore
} from 'pinia'

import type {
    PhotoModalImage
} from '@/common'

/**
 * Photo store
 */
export const usePhotoStore = defineStore('photo', {
    state: () => ({
        previewImage: null as PhotoModalImage | null,
        isToggled: false as boolean,
        isFileUploadDialogOpen: false as boolean
    }),
    getters: { 
        getPreviewImage: (state) => {
            return state.previewImage
        }
    },
    actions: {
    }
})