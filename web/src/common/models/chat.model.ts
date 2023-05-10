/**
 * Represents an emoji reaction.
 */
export interface Emoji {
    /** Timestamp of the emoji reaction */
    timeStamp: number

    /** ID of the sender */
    senderId: string

    /** Emoji value */
    emoji: string
}

/**
 * Represents reactions associated with a chat item.
 */
export interface Reactions {
    /** Array of liked items */
    likes: any[]

    /** Number of likes */
    likesCount: number

    /** Array of emoji reactions */
    Emojis: Emoji[]
}

/**
 * Represents a chat item.
 */
export interface Chat {
    /** ID of the chat item */
    utemId: string

    /** ID of the user */
    userId: string

    /** Timestamp of the chat item */
    timestamp: number

    /** Type of the chat item */
    itemType: string

    /** Indicates if the chat item is sent by the viewer */
    isSentByViewer: boolean

    /** Unique sequence ID of the chat item */
    uqSeqId: string

    /** Text content of the chat item */
    Text: string

    /** Reactions associated with the chat item */
    Reactions: Reactions
}

/**
 * Represents an inbox containing chat threads.
 */
export interface Inbox {
    /** List of chat threads */
    threads: Chat[]

    /** Number of unseen chats */
    unseenCount: number

    /** Timestamp of the last update to the unseen count */
    unseenCountTimeStamp: number
}

/**
 * Represents the viewer (current user) of the application.
 */
export interface Viewer {
    /** User ID in the database */
    id: string

    /** Number of media uploaded by the user */
    mediaCount: number

    /** URL link of the user's profile image */
    profilePicture: string

    /** Indicates whether the user is verified */
    isVerified: boolean

    /** Full name of the current user */
    fullName: string

    /** Username of the current user */
    userName: string
}
