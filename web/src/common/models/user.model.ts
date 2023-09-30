
/**
 * Base Interface for User model
 */
export interface BaseUser {
  /** Database ID */
  id: string

  /** User's first name */
  firstName: string

  /** User's last name */
  lastName: string

  /** User's user name */
  userName: string

  /** User's gender */
  gender: 'Female' | 'Male' | 'Other'

  /** URL of the user's profile picture */
  profilePictureUrl: string

  /** User's email */
  email?: string

  /** Number of posts on the user's profile */
  mediaCount?: number
  
  /** Number of followers the user has */
  followerCount: number

  /** Number of users the user is following */
  followingCount: number

  /** Relationship with other users */
  friendShip?: FriendShipStatus
}

/**
 * Interface for User model
 */
export interface User extends BaseUser {

    /** Is user active? */
    isActive?: boolean
  
    /** Whether the user's account is private or not */
    isPrivate?: boolean
  
    /** Whether the user's account is verified or not */
    isVerified?: boolean
  
    /** Is user superuser? */
    isSuperuser?: boolean
  
    /** Last login date and time */
    lastLogin?: string
  
    /** Joined date and time */
    dateJoined: string
  
    /** Entry last modification date and time */
    lastModifiedAt?: string
  
    /** Biography of the user */
    biography?: string
  
    /** Posts made by the user's */
    mediaItems: []
  }
  

/**
 * Interface for the friendship status between users.
 */
export interface FriendShipStatus {
  /**
   * Indicates whether the user is muting the other user.
   */
  muting?: boolean

  /**
   * Indicates whether the user is muting the other user's reel.
   */
  isMutingReel?: boolean

  /**
   * Indicates whether the user is following the other user.
   */
  following?: boolean

  /**
   * Indicates whether the user has sent an outgoing friendship request to the other user.
   */
  outgoingRequest?: boolean
}
