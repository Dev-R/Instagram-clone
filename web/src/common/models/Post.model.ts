
/**
 * Base interface for card models
 */

export interface BaseCard {
    /** A unique identifier for the current card */
    id: string
    
    /** Number of likes for the current card */
    likeCount: number
  
    /** Whether the current user has liked the current card */
    hasLiked: boolean

    /** Whether the current user follow the uploader of this current card */
    isFollowed: boolean

    /** Caption for the current card */
    caption: string
  
    /** Username of the current card */
    userName: string
  
    /** URL of the current card's profile picture */
    profilePictureUrl: string

    /** Unix timestamp representing when the current card was created */
    createdAt: string | number
  
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
export interface PostCard extends BaseCard {

    /** Array of media in post carousel */
    carouselMedia?: PostMedia[]
  
  }
  
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
    
    /** The list of media items in the story carousel */
    items: PostMedia[]
    
    /** The total number of media items in the story carouse */
    mediaCount: number
}


/**
 * Interface for suggestion card
 */
export interface SuggestionCard {

    /** Username of the user being suggested. */
    userName: string

    /** URL of the user's profile picture being suggested. */
    profilePictureUrl: string

    /** Information about the user that is being suggested to follow. */
    suggested: {
        /** Username of the user that is being suggested to follow. */
        userName: string

        /** URL of the user's profile picture that is being suggested to follow. */
        profilePictureUrl: string

        /** Username of the user that follows the suggested user. */
        followedBy: string
    }[]
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
  isToggled : boolean

  /** The post associated with the comment modal */
  post: PostCard
}