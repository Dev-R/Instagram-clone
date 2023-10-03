<template>
    <CommentModal 
        :is-toggled="isCommentModalOpen" />

    <PhotoModal
        @on-file-upload="uploadedFileData"
        :is-toggled="isPhotoModalOpen" />
</template>

<script setup lang="ts">
import {
    computed, ref,
} from 'vue'

import {
    useRouter
} from 'vue-router'

import {
    CommentModal,
    PhotoModal,
} from '@/components'

import {
    ModalName
} from '@/common'

import { 
    useModalManagerStore, usePhotoStore
} from '@/stores'

const windowWidth = ref(window.innerWidth)

// Services
const router = useRouter()
const modalStoreManager = useModalManagerStore()
const photoStore = usePhotoStore()

/**
 * Get uploaded file data and redirect to image view
 */
 const uploadedFileData = () => {
    // Go to image view only when screen size is extra small (i.e: Phone screen)
    if (windowType.value === 'xs')
        router.push({
            name: 'style'
        })
    photoStore.isToggled = true // Trigger photoModal in mobile view 
}

/**
 * Get current screen width
 */
 const windowType = computed(() => {
    if (windowWidth.value < 550) return 'xs'
    return null
})

const isCommentModalOpen = computed(() => {
    return modalStoreManager.getOpenModal === ModalName.COMMENT
})

// const isProfileModalOpen = computed(() => {
//     console.log("isProfileModalOpen", modalStoreManager.getOpenModal)
//     return modalStoreManager.getOpenModal === ModalName.PROFILE
// })

const isPhotoModalOpen = computed(() => {
    console.log("isPhotoModalOpen", modalStoreManager.getOpenModal)
    return modalStoreManager.getOpenModal === ModalName.PHOTO
})
</script>