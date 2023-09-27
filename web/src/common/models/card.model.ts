/**
 * Base interface for card models
 */
export interface BaseCard {

    /** A unique identifier for the current card */
    id?: string

    /** Username of the user */
    userName: string
  
    /** URL of the profile picture */
    profilePictureUrl: string

    /** Unix timestamp representing when the current card was created */
    createdAt?: string | number

    /** Caption for the current card */
    caption?: string
}

/**
 * Interface for suggestion card
 */
export interface SuggestionCard extends BaseCard {

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
 * Interface for search card
 */
export interface SearchCard extends BaseCard {
  /** User's bio */
  bio: string
}

/**
 * Interface for notification card
 */
export interface NotificationCard extends BaseCard{

  /** Notification type */
  type: 'like' | 'follow' | 'comment',

  /** Whether the user is following the current user  */
  isFollowing?: boolean
}