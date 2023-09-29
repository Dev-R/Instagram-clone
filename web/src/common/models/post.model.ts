import type { BaseCard } from "./card.model"

/**
 * Base interface for Post card models
 */
export interface BasePostCard extends BaseCard {
    
    /** Number of likes for the current card */
    likeCount: number
  
    /** Whether the current user has liked the current card */
    hasLiked: boolean

    /** Whether the current user follow the uploader of this current card */
    isFollowed: boolean
  
    /** Total number of comments on the current card */
    commentCount: number

    /** An array of comments on the current card */
    comments?: PostComment[]
}

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
 * Interface for a single post card
 */
export interface PostCard extends BasePostCard {

    /** Array of media in post carousel */
    carouselMedia?: PostMedia[]
  
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
 * Interface representing the Post Comment Modal component props
 */
export interface PostCommentModal {
  /** Flag to toggle the visibility of the modal */
  isToggled?: boolean

  /** The post associated with the comment modal */
  post: PostCard
}