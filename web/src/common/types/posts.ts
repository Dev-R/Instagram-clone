import type { BasePostCard } from "./cards"


/** 
 * Interface for a single media in a post 
 */
export interface PostMedia {
    /** Media index in the carousel */
    index: number
    /** Media type i.e: video or image */
    type: 'video' | 'image'
    /** Media URL */
    mediaUrl: string
    /** Media width in pixels */
    width?: number
    /** Media height in pixels */
    height?: number
    /** Media Title/name */
    title?: string
}


/**
 * Interface for comment card
 */
export interface PostCommentCard extends PostComment {
}

/**
 * Interface for a single post comment
 */
export interface PostComment {
  /** Comment UUID */
  id: number

  /** Comment username */
  userName: string

  /** Comment user picture URL */
  profilePictureUrl: string

  /** Comment content */
  content: string

  /** Unix timestamp representing when the comment was posted */
  createdAt: string | number
}

/**
 * Interface for a single post card
 */
export interface PostCard extends BasePostCard {

  /** Array of media in post carousel */
  carouselMedia?: PostMedia[]

}
