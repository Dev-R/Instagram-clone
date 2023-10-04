import {
  defineStore
} from 'pinia'

import {
  ModalName,
} from '@/common'

/**
 * Modal store
 */
export const useModalManagerStore = defineStore('modal', {
    state: () => ({
      modalName: null as ModalName | null, // Holds the currently open modal name or null if no modal is open
      post: null as any,
    }),
    getters: {
      isAnyModalOpen: (state) => !!state.modalName,
      shouldBlur: (state) => (state.modalName != ModalName.FOLLOW),
      getOpenModal: (state) => state.modalName,
      getActivePost: (state) => state.post,
    },
    actions: {
      openModal(modalName: ModalName) {
        this.modalName = modalName
      },
      closeModal() {
        this.modalName = null
      },
      setActivePost(post: any) {
        this.post = post
      },
      clearActivePost() {
        this.post = null
      },
      toggleModal(modalName: ModalName ) {
        if (this.modalName === modalName) {
          this.modalName = null // Close the currently open modal
        } else {
          this.modalName = modalName // Open the specified modal
        }
      },
    },
  })
  