import type { PostMedia } from "./post.model"

/**
 * Type alias for the supported media elements for a story.
 */
export type StoryMedia =  HTMLVideoElement | HTMLImageElement | undefined

/**
 * Type representing the possible types of a story.
 * - 'Image': The story contains an image.
 * - 'Video': The story contains a video.
 * - null: The story type is not determined or unsupported.
 */
export type StoryType = 'Image' | 'Video' | null


/**
 * Interface for Story Carousel modal
 */
export interface StoryCarousel {
    /** Story UUID */
    id: number

    /** User's user name */
    userName: string
  
    /** URL of the user's profile picture */
    profilePictureUrl: string

    /** The time when the story carousel expires */
    expiringAt: string
    
    /** Whether the user has seen the story carousel or not */
    seen: boolean

    /** Whether the current user has liked the story */
    hasLiked: boolean
    
    /** The list of media items in the story carousel */
    items: PostMedia[]
    
    /** The total number of media items in the story carouse */
    mediaCount: number
}
