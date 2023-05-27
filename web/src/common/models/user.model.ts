
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
  