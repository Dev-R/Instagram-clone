
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
export interface PostCard {
    /** A unique identifier for the post card */
    id: string

    /** Array of media in post carousel */
    carouselMedia: PostMedia[]
  
    /** Number of likes for the post */
    likeCount: number
  
    /** Whether the current user has liked the post */
    hasLiked: boolean
  
    /** Caption for the post */
    caption: string
  
    /** Username of the poster */
    userName: string
  
    /** URL of the poster's profile picture */
    profilePictureUrl: string

    /** Unix timestamp representing when the post was created */
    createdAt: string | number
  
    /** Total number of comments on the post */
    commentCount: number

    /** An array of comments on the post */
    comments?: PostComment[]
  }
  
/**
 * Interface for Story Carousel modal
 */
export interface StoryCarousel {
    // /** The user who created the story carousel */
    // user: User

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
 * Interface for a single post comment
 */
export interface PostComment {
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