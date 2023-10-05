import type { PostCard } from "./posts"

/**
 * Type alias for the different stages of the photo-modal.
 */
export type PhotoModalStage = 'create-post' | 'edit-post-adjustments' | 'edit-post-form' | 'sharing-post' | 'post-shared' | 'post-failed'

/**
 * Type alias for the different tabs of the photo-modal.
 */
export type PhotoModalTab = 'adjustments-tab' | 'filters-tab'

/**
 * Type alias for an image in the photo-modal.
 */
export type PhotoModalImage = string | null

/**
 * Interface for  an image filter applied to an image.
 */
export interface PhotoModalImageFilter {
    filterName: string // Filter name
    filterClass: string // CSS class for applying the filter
    displayName: string // Filter value
}

/**
 * Interface for  the adjustments for an image.
 */
export interface PhotoModalAdjustment {
    brightness: {
        label: string // Label for brightness adjustment
        level: number | string // Level of brightness adjustment
    }
    contrast: {
        label: string // Label for contrast adjustment
        level: number | string // Level of contrast adjustment
    }
    saturation: {
        label: string // Label for saturation adjustment
        level: number | string // Level of saturation adjustment
    }
}

/**
 * Interface for the form data for an image.
 */
export interface PhotoModalImageForm {
    caption: string // Caption for the image
    location: string // Location of the image
}



/**
 * Interface representing the Post Comment Modal component props
 */
export interface PostCommentModal {
    /** Flag to toggle the visibility of the modal */
    isToggled?: boolean
  
    /** The post associated with the comment modal */
    post: PostCard
  }

/**
 * Type alias representing a reference to an HTML input element.
 */
export type HTMLInputElementRef = InstanceType<typeof HTMLInputElement>