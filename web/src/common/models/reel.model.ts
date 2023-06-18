import type { BaseCard } from "./post.model"


/** 
 * Interface for a single media in a reel 
 */
export interface ReelMedia {
    /** Media type */
    type: 'video'

    /** Media URL */
    mediaUrl: string

    /** Media width in pixels */
    width?: number

    /** Media height in pixels */
    height?: number

    /** Media Title/name */
    title?: string

    /** Media location */
    location?: string
}


/**
 * Represents a single reel post
 */
export interface ReelPost extends BaseCard{
    reelMedia : ReelMedia
}