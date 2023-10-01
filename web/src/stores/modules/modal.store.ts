import { defineStore } from 'pinia'

import type { 
  ModalType,
  PostCard
} from '@/common'

/**
 * Modal store
 */
export const useModalManagerStore = defineStore('modal', {
    state: () => ({
      modalName: null as ModalType | null, // Holds the currently open modal name or null if no modal is open
      post: null as any,
    }),
    getters: {
      isAnyModalOpen: (state) => !!state.modalName,
      getOpenModal: (state) => state.modalName,
    },
    actions: {
      openModal(modalName: ModalType) {
        this.modalName = modalName
      },
      closeModal() {
        this.modalName = null
      },
      setActivePost(post: any) {
        this.post = post
      },
      toggleModal(modalName: ModalType ) {
        if (this.modalName === modalName) {
          this.modalName = null // Close the currently open modal
        } else {
          this.modalName = modalName // Open the specified modal
        }
      },
    },
  })
  